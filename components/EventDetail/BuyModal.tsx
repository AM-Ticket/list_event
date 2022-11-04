import Link from 'next/link'
import Button from '../Button'
import IconUser from '../icons/IconUser'
import IconWallet from '../icons/IconWallet'
import IconX from '../icons/IconX'
import Modal from '../Modal'
import NFTImage from '../NFTImage'

interface BuyModalProps {
	isShow: boolean
	onClose: () => void
}

const BuyModal = (props: BuyModalProps) => {
	return (
		<Modal
			isShow={props.isShow}
			onClose={props.onClose}
			closeOnBgClick={false}
			closeOnEscape={false}
		>
			<div className="w-[600px] h-[340px] mx-auto my-auto rounded-xl bg-base p-12 relative flex flex-col">
				<div
					className="absolute top-5 right-5 cursor-pointer"
					onClick={props.onClose}
				>
					<IconX size={20} color="#393939" />
				</div>
				<p className="font-extrabold text-2xl text-textDark mb-24">
					Step to Buy and claim NFT
				</p>
				<div className="flex items-center w-full">
					<div className="flex items-center relative border-t-2 border-black w-4/12">
						<div className="absolute -top-10 left-0 w-20 h-20 bg-white rounded-full border-2 border-textDark flex items-center justify-center">
							<IconWallet size={24} color="#393939" />
						</div>
						<div className="absolute top-12 -left-3 flex flex-col items-center">
							<p className="font-semibold">Create wallet</p>
							<a className="text-textLight text-sm underline cursor-pointer hover:text-neutral-50 transition">
								<Link href={`https://wallet.near.org/`}>Link</Link>
							</a>
						</div>
					</div>
					<div className="flex items-center relative border-t-2 border-black w-4/12">
						<div className="absolute -top-10 left-0 w-20 h-20 bg-white rounded-full border-2 border-textDark flex items-center justify-center">
							<IconUser size={24} color="#393939" />
						</div>
						<div className="absolute top-12 -left-3 flex flex-col items-center">
							<p className="font-semibold">Login to Near</p>
							<a className="text-textLight text-sm underline cursor-pointer hover:text-neutral-50 transition">
								<Link href={`/`}>Link</Link>
							</a>
						</div>
					</div>
					<div className="flex flex-col items-center relative w-4/12">
						<div className="absolute -top-10 left-10 w-20 h-20 flex items-center justify-center">
							<NFTImage size="small" />
						</div>
						<div className="absolute top-24 left-0">
							<Button
								size="base"
								color="primary"
								className="w-40"
								onClick={() => 0}
							>
								Claim
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default BuyModal
