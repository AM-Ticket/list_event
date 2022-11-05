import { useState } from 'react'
import { IFormSchema } from '../../interfaces/api/schema'
import Button from '../Button'
import BuyModal from '../BuyModal'
import IconLike from '../icons/IconLike'
import QRModal from '../QRModal'

const Overview = ({ data, nftData }: { data?: IFormSchema; nftData: any }) => {
	const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
	const [showQRModal, setShowQRModal] = useState<boolean>(false)
	return (
		<div className="flex flex-col justify-between">
			<div>
				<p className="font-extrabold text-3xl text-textDark mb-2">Title 1</p>
				<p className="text-xs font-extralight mb-2">by: organizer</p>
				<div className="flex items-center mb-4">
					<IconLike size={18} color="red" className="mr-1" />6
				</div>
				<p className="text-sm flex flex-wrap mb-4 line-clamp-6">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas ipsum
					consequuntur eligendi aliquid deserunt molestiae consequatur est at
					ad, officiis magni voluptates ipsa sit dolorem facilis deleniti nemo
					quidem aut.
				</p>
			</div>
			<div className="flex items-center space-x-4">
				{nftData !== '0' ? (
					<>
						<Button color="white" className="pointer-events-none" size="lg">
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
				) : (
					<Button
						color="primary"
						size="lg"
						onClickHandler={() => setShowBuyModal(true)}
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
				value="https://parasid"
				title={data?.title as string}
				isShow={showQRModal}
				onClose={() => setShowQRModal(false)}
			/>
		</div>
	)
}

export default Overview
