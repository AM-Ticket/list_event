import Link from 'next/link'
import IconWallet from './icons/IconWallet'
import IconX from './icons/IconX'
import Modal from './Modal'
import NFTImage from './NFTImage'
import Button from './Button'
import { useRouter } from 'next/router'
import { useNear } from '../contexts/near'
import IconCheck from './icons/IconCheck'
import clsx from 'clsx'
import { transactions, utils } from 'near-api-js'
import { IFormSchema } from '../interfaces/api/schema'
import BN from 'bn.js'
import { useRamperProvider } from '../contexts/RamperProvider'
import { getActiveWallet } from '../db/utils/common'

interface BuyModalProps {
	isShow: boolean
	onClose: () => void
	data?: IFormSchema
}

const BuyModal = (props: BuyModalProps) => {
	const router = useRouter()
	const { wallet } = useNear()
	const { userRamper, signAndSendTransactions } = useRamperProvider()
	const accountId = wallet?.getAccountId() || userRamper?.wallets.near.publicKey
	const onBuyNFT = async () => {
		getActiveWallet() === 'near-wallet'
			? await wallet?.account().functionCall({
					contractId: props.data?.subaccount as string,
					methodName: 'nft_buy',
					args: {},
					attachedDeposit: new BN(
						utils.format.parseNearAmount(
							props.data?.minting_price?.toString()
						) as string
					),
					gas: new BN(200000000000000),
			  })
			: await signAndSendTransactions({
					receiverId: props.data?.subaccount as string,
					actions: [
						transactions.functionCall(
							'nft_buy',
							{},
							new BN(200000000000000),
							new BN(
								utils.format.parseNearAmount(
									props.data?.minting_price?.toString()
								) as string
							)
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
					Step to Buy NFT
				</p>
				<div className="flex items-center justify-around md:justify-center w-full">
					<div className="flex items-center relative border-t-2 border-black w-6/12 md:w-4/12">
						<div className="w-20 h-20 bg-white rounded-full border-2 border-textDark flex items-center justify-center -mt-10">
							{accountId ? (
								<IconCheck size={24} color="green" />
							) : (
								<IconWallet size={24} color="#393939" />
							)}
						</div>
						<div
							className={clsx(
								`absolute top-12 -ml-3 flex flex-col items-center underline hover:text-opacity-60`,
								accountId ? `pointer-events-none` : `cursor-pointer`
							)}
							onClick={() =>
								router.push('https://wallet.testnet.near.org/create')
							}
						>
							<p className={clsx(`font-semibold`)}>Connect wallet</p>
						</div>
					</div>
					<div className="flex flex-col relative w-6/12 md:w-4/12">
						<div className="h-32 flex items-center mb-8">
							<NFTImage data={props.data} image={props.data?.nft_image} />
						</div>
						{accountId && (
							<div className="flex justify-center">
								<Button size="base" color={`primary`} onClickHandler={onBuyNFT}>
									{props?.data?.minting_price === 0 ? 'Claim Now' : 'Buy Now'}
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default BuyModal
