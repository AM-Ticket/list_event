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
import { utils } from 'near-api-js'
import { IFormSchema } from '../interfaces/api/schema'

interface BuyModalProps {
	isShow: boolean
	onClose: () => void
	data?: IFormSchema
}

const BuyModal = (props: BuyModalProps) => {
	const router = useRouter()
	const { wallet, near } = useNear()
	const onBuyNFT = async () => {
		await wallet?.account().functionCall({
			contractId: props.data?.subaccount as string,
			methodName: 'nft_buy',
			args: {},
			attachedDeposit: utils.format.parseNearAmount(
				props.data?.minting_price?.toString()
			),
			gas: 200000000000000,
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
							{wallet?.getAccountId() ? (
								<IconCheck size={24} color="green" />
							) : (
								<IconWallet size={24} color="#393939" />
							)}
						</div>
						<div
							className={clsx(
								`absolute top-12 flex flex-col items-center underline hover:text-opacity-60`,
								wallet?.getAccountId()
									? `pointer-events-none`
									: `cursor-pointer`
							)}
							onClick={() => router.push('https://wallet.near.org')}
						>
							<p className={clsx(`font-semibold`)}>Connect wallet</p>
						</div>
					</div>
					<div className="flex flex-col relative w-6/12 md:w-4/12">
						<div className="h-32 flex items-center mb-8">
							<NFTImage
								data={props.data}
								size="small"
								image={props.data?.nft_image}
							/>
						</div>
						<div className="flex justify-center">
							<Button size="base" color="primary" onClickHandler={onBuyNFT}>
								Buy Now
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default BuyModal
