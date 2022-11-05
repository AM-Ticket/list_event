import { useState } from 'react'
import Button from '../components/Button'
import Nav from '../components/Nav'
import NavbarTop from '../components/NavbarTop'
import NFTImage from '../components/NFTImage'
import QRModal from '../components/QRModal'

const MyTickets = () => {
	const [showQR, setShowQR] = useState<boolean>(false)
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="p-10">
					<p className="font-extrabold text-3xl text-textDark mb-12">
						My Tickets
					</p>
					<div className="grid grid-cols-2 gap-6">
						<div className="flex items-center justify-center">
							<div className="flex space-x-8 rounded-xl shadow-xl p-6">
								<NFTImage size="base" />
								<div className="flex flex-col justify-between">
									<div>
										<p className="font-extrabold text-xl text-textDark mb-4">
											Ticket #1
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
						</div>

						<div className="flex items-center justify-center">
							<div className="flex space-x-8 rounded-xl shadow-xl p-6">
								<NFTImage size="base" />
								<div className="flex flex-col justify-between">
									<div>
										<p className="font-extrabold text-xl text-textDark mb-4">
											Ticket #2
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
						</div>

						<div className="flex items-center justify-center">
							<div className="flex space-x-8 rounded-xl shadow-xl p-6">
								<NFTImage size="base" />
								<div className="flex flex-col justify-between">
									<div>
										<p className="font-extrabold text-xl text-textDark mb-4">
											Ticket #3
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
						</div>
					</div>
				</div>
			</div>
			<QRModal isShow={showQR} onClose={() => setShowQR(false)} />
		</div>
	)
}

export default MyTickets
