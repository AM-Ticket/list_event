// @ts-nocheck
import IconX from './icons/IconX'
import Modal from './Modal'
import QRCode from 'react-qr-code'
import { useInterval } from '../hooks/useInterval'
import axios from 'axios'
import { useNear } from '../contexts/near'

interface QRModalProps {
	isShow: boolean
	value: string
	title: string
	tokenId: string
	contractId: string
	onClose: () => void
}

const QRModal = (props: QRModalProps) => {
	const { wallet } = useNear()
	useInterval(() => {
		if (props.isShow) {
			let pendingTicket = null
			const getPendingTicket = async () => {
				pendingTicket = await axios.get('/api/ticket', {
					params: { token_id: props.tokenId, contract_id: props.contractId },
				})

				if (pendingTicket.data.data.status === 'open') {
					await wallet?.account().functionCall({
						contractId: props.contractId,
						methodName: 'redeem_nft',
						args: {
							token_id: props.tokenId,
						},
						attachedDeposit: 1,
						gas: 200000000000000,
					})
				}
			}
			getPendingTicket().catch(console.error)
		}
	}, 1500)

	return (
		<Modal isShow={props.isShow} onClose={props.onClose}>
			<div className="w-[600px] mx-auto rounded-xl bg-base p-12 relative flex flex-col items-center">
				<div
					className="absolute top-5 right-5 cursor-pointer"
					onClick={props.onClose}
				>
					<IconX size={20} color="#393939" />
				</div>
				<p className="font-extrabold text-2xl text-textDark mb-10">
					{props.title}
				</p>
				<div className="flex items-center justify-center">
					<div className="max-w-[250px] w-full">
						<QRCode
							size={250}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={props.value}
							viewBox={`0 0 256 256`}
						/>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default QRModal
