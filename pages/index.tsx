import LandingNav from '../components/Landing/LandingNav'
import Footer from '../components/icons/Landing/Footer'
import CommonHead from '../components/Head'
import { useState } from 'react'
import { Element } from 'react-scroll'
import LandingMain from '../components/Landing/LandingMain'
import LandingVision from '../components/Landing/LandingVision'
import LandingWhyUs from '../components/Landing/LandingWhyUs'

export default function Home() {
	const [activetab, setActivetab] = useState('main')
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen">
			<CommonHead image={`/pipapo.jpeg`} />
			<LandingNav activetab={activetab} setactivetab={setActivetab} />
			<LandingMain />
			<Element name="vision">
				<LandingVision />
			</Element>
			<LandingWhyUs />
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
			<Footer activetab={activetab} setactivetab={setActivetab} />
		</div>
	)
}
