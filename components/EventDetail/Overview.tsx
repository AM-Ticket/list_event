// @ts-nocheck
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { useNear } from '../../contexts/near'
import { IFormSchema } from '../../interfaces/api/schema'
import { EventService } from '../../services/Event'
import Button from '../Button'
import BuyModal from '../BuyModal'
import TransferModal from '../TransferModal'
import IconLike from '../icons/IconLike'
import IconShare from '../icons/IconShare'
import QRModal from '../QRModal'
import GiftModal from '../GiftModal'
import moment from 'moment'
import IconCalendar from '../icons/IconCalendar'
import IconPlace from '../icons/IconPlace'
import { useRamperProvider } from '../../contexts/RamperProvider'
import IconTicket from '../icons/IconTicket'
import IconGift from '../icons/Landing/IconGift'

const Overview = ({ data }: { data?: IFormSchema }) => {
	const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
	const [showTransferModal, setShowTransferModal] = useState<boolean>(false)
	const [showGiftModal, setShowGiftModal] = useState<boolean>(false)
	const [currentNft, setCurrentNft] = useState(null)
	const [showQRModal, setShowQRModal] = useState<boolean>(false)
	const [isRedeemed, setIsRedeemed] = useState()
	const router = useRouter()
	const {
		getEventTicketsByUser,
		getIsOwnedEventTicketByUser,
		getEventTotalSupply,
	} = EventService()
	const { wallet } = useNear()
	const { userRamper } = useRamperProvider()
	const accountId = wallet?.getAccountId() || userRamper?.wallets.near.publicKey
	const { data: nftSupply } = useSWR(
		data && accountId
			? {
					contractEvent: data.subaccount,
					account_id: accountId,
			  }
			: null,
		getIsOwnedEventTicketByUser
	)
	const { data: nfts } = useSWR(
		data && accountId
			? {
					contractEvent: data.subaccount,
					skip: 0,
					account_id: accountId,
			  }
			: null,
		getEventTicketsByUser,
		{
			onSuccess: (data) => {
				const nft = data?.filter(
					(data) => data.metadata.title === router.query.eventId
				)[0]
				const redeemed = JSON.parse(`${nft.metadata.extra}`).attributes.redeemed
				setCurrentNft(nft)
				setIsRedeemed(redeemed)
			},
		}
	)

	const { data: totalSupply } = useSWR(
		data && accountId
			? {
					contractEvent: data.subaccount,
			  }
			: null,
		getEventTotalSupply
	)

	const nft = nfts?.filter(
		(data) => data.metadata.title === router.query.eventId
	)[0]

	return (
		<div className="flex flex-col justify-between relative md:h-full">
			<div className="mb-4">
				<p className="font-bold text-lg">
					{moment(data?.event_date).format('MMM D')}
				</p>
				<p className="font-extrabold text-4xl text-textDark mb-2">
					{data?.title}
				</p>
				<p className="text-xs flex flex-wrap line-clamp-6 font-semibold mb-6 text-textDark">
					{data?.description}
				</p>
				<div className="flex items-center justify-between mb-4 md:mb-6">
					<p className="text-sm">
						by
						<span className="mx-1 text-primary">{data?.organizer_name}</span>
					</p>
					<div className="flex items-center space-x-2">
						<IconLike size={20} color="#FF731C" />
						<IconShare size={20} color="#FF731C" />
					</div>
				</div>
				<div>
					<div className="flex flex-wrap lg:flex-nowrap w-full space-x-0 lg:space-x-4">
						<div className="flex space-x-4 w-full lg:w-6/12 py-2">
							<div>
								<div className="rounded-xl p-2 md:p-4 bg-base flex shadow-xl">
									<IconCalendar size={25} color="#FF731C" />
								</div>
							</div>
							<div>
								<p className="font-semibold">Date and time</p>
								<p className="text-textDark text-opacity-40 text-sm">
									{moment(data?.event_date).format('ddd')},{` `}
									{moment(data?.event_date).format('LLL')}
								</p>
							</div>
						</div>
						<div className="flex space-x-4 w-full lg:w-6/12 py-2">
							<div>
								<div className="rounded-xl p-2 md:p-4 bg-base flex items-center shadow-xl">
									<IconTicket size={25} color="#FF731C" />
								</div>
							</div>
							<div>
								<p className="font-semibold">Tickets</p>
								<p className="text-textDark text-opacity-40 text-sm">
									{parseInt(data?.num_of_guests as string) -
										Number(totalSupply)}
									/{data?.num_of_guests}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center space-x-4">
				{Number(nftSupply) > 0 ? (
					isRedeemed === 'true' ? (
						<Button
							color="base"
							className="pointer-events-none bg-white shadow-xl rounded-xl"
							size="lg"
							isFullWidth
						>
							Redeemed
						</Button>
					) : (
						<>
							<Button
								color="base"
								className="pointer-events-none bg-white shadow-xl rounded-xl"
								size="lg"
							>
								Owned
							</Button>
							<Button
								color="primary"
								size="lg"
								onClickHandler={() => setShowQRModal(true)}
							>
								Show QR
							</Button>
							<Button
								color="black"
								size="lg"
								onClickHandler={() => setShowTransferModal(true)}
							>
								Transfer
							</Button>
						</>
					)
				) : (
					<>
						<Button
							color="primary"
							size="lg"
							onClickHandler={() => setShowBuyModal(true)}
							isFullWidth
						>
							Buy
						</Button>
						<Button
							color="black"
							size="lg"
							prefixIcon={<IconGift size={20} className="mr-2" />}
							onClickHandler={() => setShowGiftModal(true)}
							isFullWidth
						>
							Gift
						</Button>
					</>
				)}
			</div>
			<GiftModal
				data={data}
				isShow={showGiftModal}
				onClose={() => setShowGiftModal(false)}
			/>
			<TransferModal
				data={{ ...currentNft, subaccount: data?.subaccount }}
				isShow={showTransferModal}
				onClose={() => setShowTransferModal(false)}
			/>
			<BuyModal
				data={data}
				isShow={showBuyModal}
				onClose={() => setShowBuyModal(false)}
			/>
			<QRModal
				contractId={data?.subaccount}
				tokenId={nft?.token_id}
				value={`${process.env.NEXT_PUBLIC_API_URL}/verify-qr?token_id=${nft?.token_id}&contract_id=${data?.subaccount}`}
				title={data?.title as string}
				isShow={showQRModal}
				onClose={() => setShowQRModal(false)}
			/>
		</div>
	)
}

export default Overview
