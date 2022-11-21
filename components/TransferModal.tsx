// @ts-nocheck
import IconX from './icons/IconX'
import Modal from './Modal'
import NFTImage from './NFTImage'
import Button from './Button'
import { useNear } from '../contexts/near'
import { transactions } from 'near-api-js'
import BN from 'bn.js'
import { useRamperProvider } from '../contexts/RamperProvider'
import { getActiveWallet } from '../db/utils/common'
import Input from './common/Input'
import { useState } from 'react'

interface BuyModalProps {
	isShow: boolean
	onClose: () => void
}

const TransferModal = (props: BuyModalProps) => {
	const { wallet } = useNear()
	const { userRamper, signAndSendTransactions } = useRamperProvider()
	const [nearWalletAddress, setNearWalletAddress] = useState(null)
	const accountId = wallet?.getAccountId() || userRamper?.wallets.near.publicKey
	const onTransferNFT = async () => {
		getActiveWallet() === 'near-wallet'
			? await wallet?.account().functionCall({
					contractId: props.data?.subaccount as string,
					methodName: 'nft_transfer',
					args: {
						receiver_id: nearWalletAddress,
						token_id: props.data.token_id,
					},
					attachedDeposit: new BN(1),
					gas: new BN(200000000000000),
			  })
			: await signAndSendTransactions({
					receiverId: props.data?.subaccount as string,
					actions: [
						transactions.functionCall(
							'nft_transfer',
							{
								token_id: props.data.token_id,
								receiver_id: nearWalletAddress,
							},
							new BN(200000000000000),
							new BN(1)
						),
					],
			  })
	}
	return (
		<Modal
			isShow={props.isShow}
			onClose={props.onClose}
			closeOnBgClick={false}
			closeOnEscape={false}
		>
			<div className="w-[600px] mx-auto my-auto rounded-xl bg-base p-4 md:p-12 relative flex flex-col items-center">
				<div
					className="absolute top-5 right-5 cursor-pointer"
					onClick={props.onClose}
				>
					<IconX size={20} color="#393939" />
				</div>
				<p className="font-extrabold text-2xl text-textDark mb-12">
					Transfer NFT
				</p>
				<div className="flex items-center justify-around md:justify-center w-full">
					<div className="flex flex-col relative w-6/12 md:w-4/12">
						<div className="h-32 flex items-center mb-8">
							<NFTImage data={props.data} image={props.data?.metadata?.media} />
						</div>
						{accountId && (
							<div className="flex flex-wrap justify-center">
								<Input
									onChangeHandler={(e) => setNearWalletAddress(e.target.value)}
									placeholder={'wallet address'}
								></Input>
								<div className="flex justify-center">
									<Button
										size="lg"
										color={`primary`}
										onClickHandler={onTransferNFT}
									>
										Transfer
									</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default TransferModal
