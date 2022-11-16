// @ts-ignore
import Fade from 'react-reveal/Fade'

const LandingMain = () => {
	return (
		<Fade bottom>
			<div className="flex justify-between flex-wrap w-full pt-28 space-x-0 lg:space-x-4 px-4 lg:px-12 mb-24">
				<div className="w-full lg:w-6/12 order-first lg:order-last mb-10 lg:mb-0">
					<img
						src="/hero1.png"
						className="object-contain max-w-full aspect-video"
						alt=""
					/>
				</div>
				<div className="w-full lg:w-5/12 flex items-center flex-col space-y-4 justify-center">
					<h1 className="text-4xl lg:text-6xl font-extrabold text-center lg:text-left">
						Discover Tickets and Collect NFTs.
					</h1>
					<p className="text-lg text-center lg:text-left text-neutral-25">
						Pipapo is a blockchain-based ticketing platform. We provide white
						label and on chain solutions for event certification, proof of
						attending, and more.
					</p>
				</div>
			</div>
		</Fade>
	)
}

export default LandingMain
