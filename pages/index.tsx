import LandingNav from '../components/Landing/LandingNav'
// @ts-ignore
import Fade from 'react-reveal/Fade'
import landing from '../public/landing.json'
import IconTicket from '../components/icons/Landing/IconTicket'
import IconNep from '../components/icons/Landing/IconNep'
import IconQr from '../components/icons/Landing/IconQr'
import IconGift from '../components/icons/Landing/IconGift'
import IconCommunity from '../components/icons/Landing/IconCommunity'
import IconCommunityNear from '../components/icons/Landing/IconCommunityNear'
import Footer from '../components/icons/Landing/Footer'
import CommonHead from '../components/Head'

export default function Home() {
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen">
			<CommonHead image={`/pipapo.jpeg`} />
			<LandingNav />
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
			<div className="flex items-center justify-center mb-10">
				<h1 className="text-5xl font-extrabold">Why Us</h1>
			</div>
			<Fade left>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-y-8 px-12 mb-24">
					{landing.why_us.map((data, index) => {
						return (
							<div key={index} className="col-span-1 w-full">
								<div className="w-full lg:w-7/12 mx-auto flex flex-col flex-wrap">
									{index === 0 && <IconTicket size={30} />}
									{index === 1 && <IconNep size={30} />}
									{index === 2 && <IconQr size={30} />}
									{index === 3 && <IconGift size={30} />}
									{index === 4 && <IconCommunity size={30} />}
									{index === 5 && <IconCommunityNear size={30} />}
									<h1 className="text-sm lg:text-xl font-extrabold text-left mt-3 mb-2">
										{data.title}
									</h1>
									<p className="text-sm text-justify text-neutral-25">
										{data.desc}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</Fade>
			<div className="flex flex-col items-center justify-center mb-10 w-full lg:w-6/12 mx-auto px-4">
				<h1 className="text-5xl font-extrabold mb-4 text-center lg:text-left">
					Connect With Us
				</h1>
				<p className="text-neutral-25 text-sm text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
					natus temporibus iusto possimus neque quidem doloribus
				</p>
			</div>
			<div className="w-full lg:w-6/12 mx-auto flex flex-wrap space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 mb-24 px-4">
				<div className="w-full lg:w-8/12 h-10 lg:h-auto">
					<input
						type="text"
						className="h-full px-5 w-full border-blue-500 outline-none focus:border-blue-800 focus:border"
					/>
				</div>
				<button className="h-full w-full lg:w-3/12 text-white font-semibold bg-primary py-3 hover:bg-opacity-60">
					Subscribe
				</button>
			</div>
			<Footer />
		</div>
	)
}
