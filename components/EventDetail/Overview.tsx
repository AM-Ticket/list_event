import { useState } from 'react'
import Button from '../Button'
import IconLike from '../icons/IconLike'
import BuyModal from './BuyModal'

const Overview = () => {
	const [showBuyModal, setShowBuyModal] = useState<boolean>(false)
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
			<div>
				<Button
					color="primary"
					size="lg"
					className="px-20 py-4"
					onClick={() => setShowBuyModal(true)}
				>
					Buy
				</Button>
			</div>
			<BuyModal isShow={showBuyModal} onClose={() => setShowBuyModal(false)} />
		</div>
	)
}

export default Overview
