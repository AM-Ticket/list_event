import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { useNear } from '../../contexts/near'
import { IFormSchema } from '../../interfaces/api/schema'
import { EventService } from '../../services/Event'
import Button from '../Button'
import BuyModal from '../BuyModal'
import IconLike from '../icons/IconLike'
import IconShare from '../icons/IconShare'
import QRModal from '../QRModal'
import moment from 'moment'
import IconCalendar from '../icons/IconCalendar'
import IconPlace from '../icons/IconPlace'

const Overview = ({ data }: { data?: IFormSchema }) => {
	const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
	const [showQRModal, setShowQRModal] = useState<boolean>(false)
	const [isRedeemed, setIsRedeemed] = useState()
	const router = useRouter()
	const { getEventTicketsByUser, getIsOwnedEventTicketByUser } = EventService()
	const { wallet } = useNear()
	const { data: nftSupply } = useSWR(
		data && wallet?.getAccountId()
			? {
					contractEvent: data.subaccount,
					account_id: wallet?.getAccountId(),
			  }
			: null,
		getIsOwnedEventTicketByUser
	)
	const { data: nfts } = useSWR(
		data && wallet?.getAccountId()
			? {
					contractEvent: data.subaccount,
					skip: 0,
					account_id: wallet?.getAccountId(),
			  }
			: null,
		getEventTicketsByUser,
		{
			onSuccess: (data) => {
				const nft = data?.filter(
					(data) => data.metadata.title === router.query.eventId
				)[0]
				const redeemed = JSON.parse(`${nft.metadata.extra}`).attributes.redeemed
				setIsRedeemed(redeemed)
			},
		}
	)
	const nft = nfts?.filter(
		(data) => data.metadata.title === router.query.eventId
	)[0]
	// console.log(JSON.parse(`${nft?.metadata?.extra}`))

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
					<p className="font-extrabold text-2xl text-textDark mb-2">
						When and where
					</p>
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
									<IconPlace size={25} color="#FF731C" />
								</div>
							</div>
							<div>
								<p className="font-semibold">Location</p>
								<p className="text-textDark text-opacity-40 text-sm">
									{data?.event_location}
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
						</>
					)
				) : (
					<Button
						color="primary"
						size="lg"
						onClickHandler={() => setShowBuyModal(true)}
						isFullWidth
					>
						Buy
					</Button>
				)}
			</div>
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
