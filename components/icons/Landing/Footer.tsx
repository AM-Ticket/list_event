import {
	URL_DISCORD,
	URL_LINKEDIN,
	URL_NEAR,
	URL_TWITTER,
} from '../../../constants/url'
import IconNear from '../IconNear'
import IconDiscordWhite from './IconDiscordWhite'
import IconInstagramWhite from './IconInstagramWhite'
import IconLinkedinWhite from './IconLinkedinWhite'
import IconTwitterWhite from './IconTwitterWhite'

const Footer = () => {
	return (
		<div className="w-full bg-footer pt-10 pb-20 px-8 lg:px-20 text-white grid grid-cols-12">
			<div className="col-span-12 lg:col-span-4 -ml-5 flex cursor-pointer">
				<img src="/pipapo-white.png" className="object-contain w-44" alt="" />
			</div>
			<div className="col-span-6 lg:col-span-2 flex flex-col py-5">
				<p className="font-semibold text-base mb-2">ABOUT</p>
				<p className="text-sm mb-1 text text-neutral-60 hover:text-opacity-70 cursor-pointer">
					Vision
				</p>
				<p className="text-sm mb-1 text-neutral-60 hover:text-opacity-70 cursor-pointer">
					Pipapo Events
				</p>
				<p className="text-sm text-neutral-60 hover:text-opacity-70 cursor-pointer">
					Pipapo Dashboard
				</p>
			</div>
			<div className="col-span-6 lg:col-span-2 flex flex-col py-5">
				<p className="font-semibold text-base mb-2">SUPPORT</p>
				<p className="text-sm mb-1 text-neutral-60 hover:text-opacity-70 cursor-pointer">
					Developer
				</p>
				<p className="text-sm text-neutral-60 hover:text-opacity-70 cursor-pointer">
					Community
				</p>
			</div>
			<div className="col-span-12 lg:col-span-4 flex flex-col py-5">
				<p className="font-semibold text-base mb-2">GET TO KNOW US</p>
				<div className="flex items-center space-x-6 mb-6">
					<IconInstagramWhite size={20} />
					<a href={URL_TWITTER} target="_blank">
						<IconTwitterWhite size={20} />
					</a>
					<a href={URL_DISCORD} target={`_blank`}>
						<IconDiscordWhite size={20} />
					</a>
					<a href={URL_LINKEDIN} target={`_blank`}>
						<IconLinkedinWhite size={20} />
					</a>
				</div>
				<div>
					<p className="text-white text-sm">Powered by</p>
					<a href={URL_NEAR} target={`_blank`}>
						<IconNear size={30} color="white" />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer
