import Button from '../../Button'
import LeftSide from './LeftSide'
import NFTImage from '../../NFTImage'
import BuyModal from '../../BuyModal'
import { useState } from 'react'
import { IFormSchema } from '../../../interfaces/api/schema'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useNear } from '../../../contexts/near'
import { EventService } from '../../../services/Event'
import IconCalendar from '../../icons/IconCalendar'
import moment from 'moment'
import IconPrice from '../../icons/IconPrice'
import IconPlace from '../../icons/IconPlace'
import IconTicket from '../../icons/IconTicket'
import { prettyTruncate } from '../../../db/utils/common'
import { useRamperProvider } from '../../../contexts/RamperProvider'
import IconNear from '../../icons/IconNear'
import useBaseStore from '../../../stores/baseStore'
import IconEO from '../../icons/IconEO'
import Tippy from '@tippyjs/react'
import IconInfo from '../../icons/IconInfo'

interface EventItemProps {
	data: IFormSchema
}

const EventItem = (props: EventItemProps) => {
	const [showBuyModal, setShowBuyModal] = useState(false)
	const { wallet } = useNear()
	const { nearUsdPrice } = useBaseStore()
	const { userRamper } = useRamperProvider()
	const accountId = wallet?.getAccountId() || userRamper?.wallets.near.publicKey
	const router = useRouter()
	const {
		getIsOwnedEventTicketByUser,
		getEventTicketsByUser,
		getEventTotalSupply,
	} = EventService()
	const [isRedeemed, setIsRedeemed] = useState()
	const { data: nftSupply } = useSWR(
		props.data && accountId
			? {
					contractEvent: props.data.subaccount,
					account_id: accountId,
			  }
			: null,
		getIsOwnedEventTicketByUser
	)

	const { data: nfts } = useSWR(
		nftSupply && accountId
			? {
					contractEvent: props.data.subaccount,
					skip: 0,
					account_id: accountId,
			  }
			: null,
		getEventTicketsByUser,
		{
			onSuccess: (data) => {
				const nft = data?.filter(
					(data) => data.metadata.title === props.data.title
				)[0]
				const _redeemed =
					JSON.parse(`${nft.metadata.extra}`).attributes.redeemed ||
					JSON.parse(`${nft.metadata.extra}`).attributes[0].value
				setIsRedeemed(_redeemed)
			},
		}
	)

	const { data: totalSupply } = useSWR(
		props.data
			? {
					contractEvent: props.data.subaccount,
			  }
			: null,
		getEventTotalSupply
	)

	return (
		<div className="rounded-xl shadow-xl bg-white flex w-11/12 md:w-10/12 lg:w-9/12 mx-auto md:mx-0">
			<LeftSide data={props.data} />
			<div className="flex flex-wrap flex-1 p-6 space-x-0 md:space-x-6 space-y-4 md:space-y-0 z-0">
				<div className="w-full md:w-4/12">
					<NFTImage data={props.data} image={props.data.nft_image} />
				</div>
				<div className="flex flex-col justify-between w-full md:w-7/12">
					<div>
						<p className="font-extrabold text-lg md:text-3xl text-textDark mb-2">
							{props.data.title}
						</p>
						<p className="text-sm flex flex-wrap line-clamp-2 mb-2">
							{props.data.description}
						</p>
						<p className="text-sm text-textLight flex items-center flex-wrap mb-4">
							<IconPlace size={14} color="#969BAB" className="mr-1" />
							{prettyTruncate(props.data.event_location, 20)}
						</p>
						<div className="flex items-center">
							<div className="rounded-xl p-2 bg-base flex items-center shadow-xl mb-4">
								<IconPrice size={25} color="#FF731C" className="mx-1" />
								<p className="font-semibold flex items-center text-sm">
									{props.data.minting_price === 0 ? (
										'Free'
									) : (
										<>
											{props.data.minting_price}
											<IconNear
												size={14}
												color="#393939"
												className="mb-[1px]"
											/>
											{` `}~ $
											{(
												nearUsdPrice *
												((props.data?.minting_price as number) || 0)
											).toFixed(2)}
										</>
									)}
								</p>
							</div>
						</div>
						<div className="flex items-center flex-wrap space-x-4 mb-4">
							<div className="flex flex-col items-center space-y-2">
								<div className="rounded-xl p-2 bg-base flex items-center shadow-xl">
									<IconCalendar size={25} color="#FF731C" />
								</div>
								<p className="text-xs font-semibold">
									{moment(props.data.event_date).format(`ll`)}
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2">
								<div className="rounded-xl p-2 bg-base flex items-center shadow-xl">
									<IconTicket size={25} color="#FF731C" />
								</div>
								<p className="text-xs font-semibold">
									{parseInt(props.data?.num_of_guests as string) -
										Number(totalSupply)}
									/{props.data?.num_of_guests} tickets
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2">
								<div className="rounded-xl p-2 bg-base flex items-center shadow-xl">
									<IconEO size={25} color="#FF731C" />
								</div>
								<p className="text-xs font-semibold flex items-center">
									<span className="inline md:hidden">
										{prettyTruncate(props.data.organizer_name, 10)}
									</span>
									<span className="hidden md:inline">
										{prettyTruncate(props.data.organizer_name, 15)}
									</span>
									<Tippy
										content={props.data.organizer_name}
										theme="dark"
										className="border-2 p-1 rounded-xl"
									>
										<div>
											<IconInfo color="#393939" size={16} className="mx-1" />
										</div>
									</Tippy>
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						{nftSupply > Number(0) ? (
							isRedeemed === 'true' ? (
								<Button
									color="base"
									className="pointer-events-none bg-base"
									size="lg"
								>
									Redeemed
								</Button>
							) : (
								<Button
									color="base"
									className="pointer-events-none bg-base"
									size="lg"
								>
									Owned
								</Button>
							)
						) : (
							<Button
								onClickHandler={() => setShowBuyModal(true)}
								rounded="xl"
								size="lg"
								color="primary"
							>
								{props?.data?.minting_price === 0 ? 'Claim' : 'Buy'}
							</Button>
						)}
						<p
							className="font-semibold cursor-pointer text-textDark hover:text-opacity-60 transition"
							onClick={() => router.push(`/event/${props.data.title}`)}
						>
							View Details
						</p>
					</div>
				</div>
			</div>
			<BuyModal
				data={props.data}
				isShow={showBuyModal}
				onClose={() => setShowBuyModal(false)}
			/>
		</div>
	)
}

export default EventItem
