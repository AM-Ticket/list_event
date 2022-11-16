// @ts-ignore
import Fade from 'react-reveal/Fade'

const LandingVision = () => {
	return (
		<>
			<div className="flex items-center justify-center mb-10">
				<h1 className="text-5xl font-extrabold">Our Vision</h1>
			</div>
			<Fade bottom>
				<div className="flex flex-wrap justify-between w-full space-x-0 lg:space-x-4 px-12 mb-24">
					<div className="w-full lg:w-6/12 order-first mb-10 lg:mb-0">
						<img
							src="/hero2.png"
							className="object-contain max-w-full aspect-video"
							alt=""
						/>
					</div>
					<div className="w-full lg:w-5/12 flex items-start flex-col space-y-4 justify-center">
						<h1 className="text-xl lg:text-3xl font-extrabold text-center lg:text-left">
							Onboarding Users
						</h1>
						<p className="text-normal lg:text-lg text-justify text-neutral-25">
							Onboarding web2 users to web3 using the NFT ticketing system,
							subscriptions, or other similar things, as well as providing the
							benefits of using NFT that can be applied in every day in life.
							easy to use and user friendly and also contribute to increasing
							the number of web3 users, especially in near blockchain.
						</p>
					</div>
				</div>
			</Fade>
		</>
	)
}

export default LandingVision
