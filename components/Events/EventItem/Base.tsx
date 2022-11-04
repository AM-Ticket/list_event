import {
	IMG_BCA_URL,
	IMG_BNI_URL,
	IMG_MASTERCARD_URL,
	IMG_NFT_URL,
	IMG_PAYPAL_URL,
	IMG_VISA_URL,
} from '../../../constants/url'
import Button from '../../Button'
import LeftSide from './LeftSide'
import NFTImage from '../../NFTImage'

const EventItem = () => {
	return (
		// <div className="px-5">
		<div className="rounded-xl shadow-xl bg-white flex w-8/12 mx-5">
			<LeftSide />
			<div className="flex flex-1 p-6 space-x-4 min-h-[320px]">
				<NFTImage size="base" />
				<div className="p-2 flex flex-col justify-between">
					<div>
						<p className="font-extrabold text-3xl text-textDark mb-2">
							Title 1
						</p>
						<p className="text-sm flex flex-wrap line-clamp-2 mb-4">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
							ipsum consequuntur eligendi aliquid deserunt molestiae consequatur
							est at ad, officiis magni voluptates ipsa sit dolorem facilis
							deleniti nemo quidem aut.
						</p>
						<p className="font-bold text-xl text-textDark mb-4">
							Rp 100,000 ~ $10
						</p>
						<div className="flex items-center space-x-4">
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
						</div>
					</div>
					<div>
						<Button
							onClickHandler={() => 0}
							rounded="xl"
							size="lg"
							color="primary"
						>
							Buy
						</Button>
					</div>
				</div>
			</div>
		</div>
		// </div>
	)
}

export default EventItem
