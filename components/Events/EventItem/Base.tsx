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

interface EventItemProps {
	data: IFormSchema
}

const EventItem = (props: EventItemProps) => {
	const [showBuyModal, setShowBuyModal] = useState(false)
	const { wallet } = useNear()
	const router = useRouter()
	const { getIsOwnedEventTicketByUser } = EventService()
	const { data: nftSupply } = useSWR(
		props.data && wallet?.getAccountId()
			? {
					contractEvent: props.data.subaccount,
					account_id: wallet?.getAccountId(),
			  }
			: null,
		getIsOwnedEventTicketByUser
	)
	return (
		<div className="rounded-xl shadow-xl bg-white flex w-full md:w-8/12">
			<LeftSide />
			<div className="flex flex-wrap flex-1 p-6 space-x-0 md:space-x-4 space-y-4 md:space-y-0 z-0">
				<div className="w-full md:w-4/12">
					<NFTImage
						data={props.data}
						size="base"
						image={props.data.nft_image}
					/>
				</div>
				<div className="flex flex-col justify-between w-full md:w-7/12">
					<div>
						<p className="font-extrabold text-lg md:text-3xl text-textDark mb-2">
							{props.data.title}
						</p>
						<p className="text-sm flex flex-wrap line-clamp-2 mb-4">
							{props.data.description}
						</p>
						<p className="font-bold text-lg text-textDark mb-4">
							Rp {(props.data.minting_price as number) * 15000} ~ $
							{props.data.minting_price}
						</p>
						{/* <div className="flex items-center space-x-4">
							<div className="bg-base rounded-lg py-2 px-8 flex flex-col items-center">
								<p className="text-xs text-textLight whitespace-nowrap">
									Credit Card
								</p>
								<div className="flex items-center space-x-2">
									<img
										src={IMG_MASTERCARD_URL}
										alt=""
										className="object-contain"
									/>
									<img src={IMG_VISA_URL} alt="" className="object-contain" />
								</div>
							</div>
							<div className="bg-base rounded-lg py-2 px-8 flex flex-col items-center">
								<p className="text-xs text-textLight">Paypal</p>
								<img src={IMG_PAYPAL_URL} alt="" className="object-contain" />
							</div>
							<div className="bg-base rounded-lg py-2 px-8 flex flex-col items-center">
								<p className="text-xs text-textLight whitespace-nowrap">
									Bank Transfer
								</p>
								<div className="flex items-center space-x-2">
									<img src={IMG_BNI_URL} alt="" className="object-contain" />
									<img src={IMG_BCA_URL} alt="" className="object-contain" />
								</div>
							</div>
						</div> */}
					</div>
					<div className="flex items-center space-x-2">
						{nftSupply !== '0' ? (
							<Button
								color="white"
								className="pointer-events-none bg-gray-300"
								size="lg"
							>
								Owned
							</Button>
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
