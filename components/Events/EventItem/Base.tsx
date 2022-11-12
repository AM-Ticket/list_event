import Button from '../../Button'
import LeftSide from './LeftSide'
import NFTImage from '../../NFTImage'
import BuyModal from '../../BuyModal'
import { useState } from 'react'
import { EPaymentMethod, IFormSchema } from '../../../interfaces/api/schema'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useNear } from '../../../contexts/near'
import { EventService } from '../../../services/Event'
import {
	IMG_BCA_URL,
	IMG_BNI_URL,
	IMG_MASTERCARD2_URL,
	IMG_MASTERCARD_URL,
	IMG_PAYPAL2_URL,
	IMG_PAYPAL_URL,
	IMG_VISA2_URL,
	IMG_VISA_URL,
} from '../../../constants/url'
import IconCalendar from '../../icons/IconCalendar'
import moment from 'moment'
import IconPrice from '../../icons/IconPrice'
import IconPlace from '../../icons/IconPlace'
import IconTicket from '../../icons/IconTicket'
import { prettyTruncate } from '../../../db/utils/common'

interface EventItemProps {
	data: IFormSchema
}

const EventItem = (props: EventItemProps) => {
	const [showBuyModal, setShowBuyModal] = useState(false)
	const { wallet } = useNear()
	const router = useRouter()
	const { getIsOwnedEventTicketByUser, getEventTicketsByUser } = EventService()
	const [isRedeemed, setIsRedeemed] = useState()
	const { data: nftSupply } = useSWR(
		props.data && wallet?.getAccountId()
			? {
					contractEvent: props.data.subaccount,
					account_id: wallet?.getAccountId(),
			  }
			: null,
		getIsOwnedEventTicketByUser
	)

	const { data: nfts } = useSWR(
		nftSupply && wallet?.getAccountId()
			? {
					contractEvent: props.data.subaccount,
					skip: 0,
					account_id: wallet?.getAccountId(),
			  }
			: null,
		getEventTicketsByUser,
		{
			onSuccess: (data) => {
				const nft = data?.filter(
					(data) => data.metadata.title === props.data.title
				)[0]
				const _redeemed = JSON.parse(`${nft.metadata.extra}`).attributes
					.redeemed
				console.log(nft)
				console.log(_redeemed)
				setIsRedeemed(_redeemed)
			},
		}
	)

	return (
		<div className="rounded-xl shadow-xl bg-white flex w-11/12 md:w-10/12 lg:w-9/12 mx-auto md:mx-0">
			<LeftSide />
			<div className="flex flex-wrap flex-1 p-6 space-x-0 md:space-x-6 space-y-4 md:space-y-0 z-0">
				<div className="w-11/12 md:w-4/12">
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
						<div className="flex items-center flex-wrap space-x-4 mb-4">
							<div className="flex flex-col items-center space-y-2">
								<div className="rounded-xl p-4 bg-base flex items-center shadow-xl">
									<IconCalendar size={25} color="#FF731C" />
								</div>
								<p className="text-xs font-semibold">
									{moment(props.data.event_date).format(`ll`)}
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2">
								<div className="rounded-xl p-4 bg-base flex items-center shadow-xl">
									<IconPrice size={25} color="#FF731C" />
								</div>
								<p className="text-xs font-semibold">
									${` `}
									{props.data.minting_price}
								</p>
							</div>
							<div className="flex flex-col items-center space-y-2">
								<div className="rounded-xl p-4 bg-base flex items-center shadow-xl">
									<IconTicket size={25} color="#FF731C" />
								</div>
								<p className="text-xs font-semibold">
									{props.data.num_of_guests} tickets
								</p>
							</div>
							{/* {props.data.payment_method.filter(
								(data) => data === EPaymentMethod['credit_card']
							)[0] && (
								<div className="bg-base rounded-lg py-1 md:py-2 px-8 flex flex-col items-center w-32">
									<p className="text-xs text-black whitespace-nowrap">
										Credit Card
									</p>
									<div className="flex items-center space-x-2">
										<img
											src={IMG_MASTERCARD_URL}
											alt=""
											className="object-contain w-20"
										/>
										<img
											src={IMG_VISA_URL}
											alt=""
											className="object-contain w-20"
										/>
									</div>
								</div>
							)}
							{props.data.payment_method.filter(
								(data) => data === EPaymentMethod['bank_transfer']
							)[0] && (
								<div className="bg-base rounded-lg py-1 md:py-2 px-8 flex flex-col items-center w-32">
									<p className="text-xs text-black">Paypal</p>
									<img
										src={IMG_PAYPAL_URL}
										alt=""
										className="object-contain w-20"
									/>
								</div>
							)}
							{props.data.payment_method.filter(
								(data) => data === EPaymentMethod['paypal']
							)[0] && (
								<div className="bg-base rounded-lg py-1 md:py-2 px-8 flex flex-col items-center w-32">
									<p className="text-xs text-black whitespace-nowrap">
										Bank Transfer
									</p>
									<div className="flex items-center space-x-2">
										<img src={IMG_BNI_URL} alt="" className="object-contain" />
										<img src={IMG_BCA_URL} alt="" className="object-contain" />
									</div>
								</div>
							)} */}
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
								Buy
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
