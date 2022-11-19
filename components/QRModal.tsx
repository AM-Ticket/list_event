// @ts-nocheck
import IconX from './icons/IconX'
import Modal from './Modal'
import QRCode from 'react-qr-code'
import { useNear } from '../contexts/near'
import { useRamperProvider } from '../contexts/RamperProvider'
import { getActiveWallet } from '../db/utils/common'
import useSWR from 'swr'
import { transactions } from 'near-api-js'
import { TicketService } from '../services/Ticket'
import BN from 'bn.js'

interface QRModalProps {
	isShow: boolean
	value: string
	title: string
	tokenId?: string
	contractId?: string
	onClose: () => void
}

const QRModal = (props: QRModalProps) => {
	const { wallet } = useNear()
	const { signAndSendTransactions } = useRamperProvider()
	const { getTicketData } = TicketService()
	const {} = useSWR(
		props.isShow && `ticket::${props.contractId}::${props.tokenId}`,
		async (key: string) => {
			const [contract_id, token_id] = key.split('::').slice(1)
			return await getTicketData({
				token_id,
				contract_id,
			})
		},
		{
			refreshInterval: 500,
			onSuccess: async (data) => {
				console.log(data)
				if (data.status === 'open') {
					getActiveWallet() === 'near-wallet'
						? await wallet?.account().functionCall({
								contractId: props.contractId,
								methodName: 'redeem_nft',
								args: {
									token_id: props.tokenId,
								},
								attachedDeposit: 1,
								gas: 200000000000000,
						  })
						: await signAndSendTransactions({
								receiverId: props.contractId,
								actions: [
									transactions.functionCall(
										'redeem_nft',
										{ token_id: props.tokenId },
										new BN(200000000000000),
										new BN(1)
									),
								],
						  })
				} else return
			},
			onError: (err) => console.log(err),
		}
	)
	// useInterval(() => {
	// 	if (props.isShow) {
	// 		let pendingTicket = null
	// 		const getPendingTicket = async () => {
	// 			pendingTicket = await axios.get('/api/ticket', {
	// 				params: { token_id: props.tokenId, contract_id: props.contractId },
	// 			})

	// 			if (pendingTicket.data.data.status === 'open') {
	// 				getActiveWallet() === 'near-wallet'
	// 					? await wallet?.account().functionCall({
	// 							contractId: props.contractId,
	// 							methodName: 'redeem_nft',
	// 							args: {
	// 								token_id: props.tokenId,
	// 							},
	// 							attachedDeposit: 1,
	// 							gas: 200000000000000,
	// 					  })
	// 					: await signAndSendTransactions({
	// 							receiverId: props.contractId,
	// 							actions: [
	// 								transactions.functionCall(
	// 									'redeem_nft',
	// 									{ token_id: props.tokenId },
	// 									new BN(200000000000000),
	// 									new BN(1)
	// 								),
	// 							],
	// 					  })
	// 			}
	// 		}
	// 		getPendingTicket().catch(console.error)
	// 	}
	// }, 500)

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
				<p className="text-xs text-white mb-10 text-center bg-textDark p-3 rounded-xl">
					Once you scan your QR NFT Ticket and redeemed, you can't try to
					redeeming again. After scanning, you'll be direct to wallet page to
					complete the transaction
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
