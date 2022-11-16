// @ts-ignore
import Fade from 'react-reveal/Fade'
import landing from '../../public/landing.json'
import IconCommunity from '../icons/Landing/IconCommunity'
import IconCommunityNear from '../icons/Landing/IconCommunityNear'
import IconGift from '../icons/Landing/IconGift'
import IconNep from '../icons/Landing/IconNep'
import IconQr from '../icons/Landing/IconQr'
import IconTicket from '../icons/Landing/IconTicket'

const LandingWhyUs = () => {
	return (
		<>
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
		</>
	)
}

export default LandingWhyUs
