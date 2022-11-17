// @ts-nocheck
import Button from './Button'
import NFTImage from './NFTImage'
import { useState } from 'react'
import QRModal from './QRModal'
import { IMG_NFT_URL } from '../constants/url'
import { useRouter } from 'next/router'
import Tippy from '@tippyjs/react'
import IconInfo from './icons/IconInfo'

export default function TicketModal(props) {
	const [showQR, setShowQR] = useState<boolean>(false)
	const router = useRouter()

	return (
		<div className="flex items-center justify-center">
			<div className="flex space-x-2 w-full lg:w-auto h-full md:space-x-8 rounded-xl shadow-xl p-4 md:p-8">
				<div className="w-5/12">
					<NFTImage
						data={props.data || ''}
						title={props.data?.metadata?.title}
						image={props.data?.metadata?.media || IMG_NFT_URL}
					/>
				</div>
				<div className="flex flex-col justify-between w-6/12">
					<div>
						<p className="font-extrabold text-xl text-textDark mb-2">
							{props.children}
						</p>
						<p
							className="text-sm text-textDark hover:text-opacity-60 cursor-pointer transition"
							onClick={() => router.push(`/event/${props.children}`)}
						>
							View Details
						</p>
					</div>
					<div>
						{!props.redeemed ? (
							<div className="flex gap-x-1">
								<Button
									color="primary"
									size="base"
									onClickHandler={() => setShowQR(true)}
								>
									Show QR
								</Button>
								<Button
									color="black"
									size="base"
									onClickHandler={() => setShowQR(true)}
								>
									Transfer
								</Button>
							</div>
						) : (
							<div className="flex items-center space-x-1">
								<div className="bg-gray-200 text-gray-600 px-5 py-2 rounded-xl inline-block">
									Redemeed
								</div>
								<Tippy
									content={`This QR NFT Ticket can't be utilize again`}
									theme="dark"
									className="border-2 p-1 rounded-xl"
								>
									<div>
										<IconInfo color="#393939" size={16} />
									</div>
								</Tippy>
							</div>
						)}
					</div>
				</div>
			</div>
			<QRModal
				tokenId={props.tokenId}
				contractId={props.contractId}
				value={props.url}
				isShow={showQR}
				title={props.children}
				onClose={() => setShowQR(false)}
			/>
		</div>
	)
}
