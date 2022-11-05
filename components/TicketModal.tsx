// @ts-nocheck
import Button from './Button'
import NFTImage from './NFTImage'
import { useState } from 'react'
import QRModal from './QRModal'

export default function TicketModal(props) {
	const [showQR, setShowQR] = useState<boolean>(false)

	return (
		<div className="flex items-center justify-center">
			<div className="flex space-x-8 rounded-xl shadow-xl p-6">
				<NFTImage size="base" />
				<div className="flex flex-col justify-between">
					<div>
						<p className="font-extrabold text-xl text-textDark mb-4">
							{props.children}
						</p>
						<p className="text-sm text-textDark">View Details</p>
					</div>
					<div>
						<Button
							color="black"
							size="base"
							onClickHandler={() => setShowQR(true)}
						>
							View QR COde
						</Button>
					</div>
				</div>
			</div>
			<QRModal
				value={props.url}
				isShow={showQR}
				title={props.children}
				onClose={() => setShowQR(false)}
			/>
		</div>
	)
}