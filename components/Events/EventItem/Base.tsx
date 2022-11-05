import {
	IMG_BCA_URL,
	IMG_BNI_URL,
	IMG_MASTERCARD_URL,
	IMG_PAYPAL_URL,
	IMG_VISA_URL,
} from '../../../constants/url'
import Button from '../../Button'
import LeftSide from './LeftSide'
import NFTImage from '../../NFTImage'
import BuyModal from '../../BuyModal'
import { useState } from 'react'
import { IFormSchema } from '../../../interfaces/api/schema'
import { utils } from 'near-api-js'

interface EventItemProps {
	data: IFormSchema
}

const EventItem = (props: EventItemProps) => {
	const [showBuyModal, setShowBuyModal] = useState(false)
	return (
		<div className="rounded-xl shadow-xl bg-white flex w-8/12 mx-5">
			<LeftSide />
			<div className="flex flex-1 p-6 space-x-4 min-h-[320px]">
				<NFTImage size="base" image={props.data.nft_image} />
				<div className="p-2 flex flex-col justify-between">
					<div>
						<p className="font-extrabold text-3xl text-textDark mb-2">
							{props.data.title}
						</p>
						<p className="text-sm flex flex-wrap line-clamp-2 mb-4">
							{props.data.description}
						</p>
						<p className="font-bold text-xl text-textDark mb-4">
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
					<div>
						<Button
							onClickHandler={() => setShowBuyModal(true)}
							rounded="xl"
							size="lg"
							color="primary"
						>
							Buy
						</Button>
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
