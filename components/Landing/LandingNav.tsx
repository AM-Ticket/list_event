import { useState } from 'react'
import Button from '../Button'
import IconDashboard from '../icons/IconDashboard'
import IconStar from '../icons/IconStar'
import IconTicket from '../icons/IconTicket'
import { CSSTransition } from 'react-transition-group'
import IconGithub from '../icons/IconGithub'
import IconDiscord from '../icons/IconDiscord'
import IconTelegram from '../icons/IconTelegram'
import IconTwitter from '../icons/IconTwitter'
import { useRouter } from 'next/router'
import IconBurger from '../icons/IconBurger'
import IconX from '../icons/IconX'
import IconDown from '../icons/IconDown'

interface IMenu {
	about: boolean
	product: boolean
	developer: boolean
	community: boolean
}

type TMenu = 'about' | 'product' | 'developer' | 'community'

const Dropdown = ({ type }: { type: TMenu }) => {
	return (
		<div className="absolute rounded-xl bg-white shadow-xl flex flex-col w-72 top-full left-0">
			{type === 'about' && (
				<>
					<div className="flex items-center justify-between w-full hover:bg-base p-4 rounded-xl">
						<IconStar size={24} color="#FF731C" className="w-3/12" />
						<div className="text-textDark w-9/12">
							<p className="font-semibold text-sm">Vision</p>
							<p className="text-xs">The vision bring by Pipapo</p>
						</div>
					</div>
				</>
			)}
			{type === 'product' && (
				<>
					<div className="flex items-center justify-between w-full hover:bg-base p-4 rounded-t-xl">
						<IconTicket size={28} color="#FF731C" className="w-3/12" />
						<div className="text-textDark w-9/12">
							<p className="font-semibold text-sm">Pipapo Events</p>
							<p className="text-xs font-normal">
								Easily buy and redeem NFT ticketing
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between w-full hover:bg-base p-4 rounded-b-xl">
						<IconDashboard size={28} color="#FF731C" className="w-3/12" />
						<div className="text-textDark w-9/12">
							<p className="font-semibold text-sm">Pipapo Dashboard</p>
							<p className="text-xs font-normal">
								Provide organizer to analyze their selling
							</p>
						</div>
					</div>
				</>
			)}
			{type === 'developer' && (
				<>
					<div className="flex items-center justify-between w-full hover:bg-base p-4 rounded-t-xl">
						<IconGithub size={28} color="#FF731C" className="w-3/12" />
						<div className="text-textDark w-9/12">
							<p className="font-semibold text-sm">Github</p>
							<p className="text-xs font-normal">Discover our codebase</p>
						</div>
					</div>
				</>
			)}
			{type === 'community' && (
				<>
					<div className="flex items-center justify-between w-full hover:bg-base p-4 rounded-t-xl">
						<IconDiscord size={28} color="#FF731C" className="w-3/12" />
						<div className="text-textDark w-9/12">
							<p className="font-semibold text-sm">Discord</p>
							<p className="text-xs font-normal">
								Chat with our Pipapo supporters
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between w-full hover:bg-base p-4 rounded-t-xl">
						<IconTelegram size={28} color="#FF731C" className="w-3/12" />
						<div className="text-textDark w-9/12">
							<p className="font-semibold text-sm">Telegram</p>
							<p className="text-xs font-normal">
								Connect with our developer to raise anything
							</p>
						</div>
					</div>
					<div className="flex items-center justify-between w-full hover:bg-base p-4 rounded-t-xl">
						<IconTwitter size={28} color="#FF731C" className="w-3/12" />
						<div className="text-textDark w-9/12">
							<p className="font-semibold text-sm">Twitter</p>
							<p className="text-xs font-normal">
								Discover and get latest news abaout Pipapo
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

const LandingNav = () => {
	const router = useRouter()
	const [showSmallMenu, setShowSmallMenu] = useState<boolean>(false)
	const [aboutMenuSmall, setAboutMenuSmall] = useState<boolean>(false)
	const [productMenuSmall, setProductMenuSmall] = useState<boolean>(false)
	const [developerMenuSmall, setDeveloperMenuSmall] = useState<boolean>(false)
	const [communityMenuSmall, setCommunityMenuSmall] = useState<boolean>(false)
	const [dropdownNav, setDropdownNav] = useState<IMenu>({
		about: false,
		product: false,
		developer: false,
		community: false,
	})

	const onMouseOverMenu = (menu: TMenu) => {
		setDropdownNav((prev) => ({
			...prev,
			[menu]: true,
		}))
	}

	const onMouseLeaveMenu = (menu: TMenu) => {
		setDropdownNav((prev) => ({
			...prev,
			[menu]: false,
		}))
	}

	return (
		<>
			<div className="fixed inset-x-0 py-4 bg-base hidden lg:flex items-center justify-around z-10">
				<div className="flex items-center">
					<img
						src="/Pipapo-negative.png"
						className="w-60 aspect-[5/1] object-contain rounded-xl"
						alt=""
					/>
					<div className="flex items-center space-x-8 font-semibold text-base text-black">
						<div
							className="py-4 text-sm hover:text-primary transition cursor-pointer relative"
							onMouseOver={() => onMouseOverMenu('about')}
							onMouseLeave={() => onMouseLeaveMenu('about')}
						>
							<p>About</p>
							{dropdownNav.about && <Dropdown type={`about`} />}
						</div>
						<div
							className="py-4 text-sm hover:text-primary transition cursor-pointer relative"
							onMouseOver={() => onMouseOverMenu('product')}
							onMouseLeave={() => onMouseLeaveMenu('product')}
						>
							<p>Product</p>
							{dropdownNav.product && <Dropdown type={`product`} />}
						</div>
						<div
							className="py-4 text-sm hover:text-primary transition cursor-pointer relative"
							onMouseOver={() => onMouseOverMenu('developer')}
							onMouseLeave={() => onMouseLeaveMenu('developer')}
						>
							<p>Developers</p>
							{dropdownNav.developer && <Dropdown type={`developer`} />}
						</div>
						<div
							className="py-4 text-sm hover:text-primary transition cursor-pointer relative"
							onMouseOver={() => onMouseOverMenu('community')}
							onMouseLeave={() => onMouseLeaveMenu('community')}
						>
							<p>Community</p>
							{dropdownNav.community && <Dropdown type={`community`} />}
						</div>
					</div>
				</div>
				<div>
					<Button
						color="primary"
						size="lg"
						onClickHandler={() => router.push(`/events`)}
					>
						Launch App
					</Button>
				</div>
			</div>
			<div className="fixed flex flex-col lg:hidden inset-x-0 z-10">
				<div className="flex w-full items-center justify-between px-4 z-20 bg-white py-3">
					<img
						src="/Pipapo-negative.png"
						className="w-40 aspect-[4/1] object-contain rounded-xl"
						alt=""
					/>
					<div
						className="cursor-pointer"
						onClick={() => setShowSmallMenu((prev) => !prev)}
					>
						{showSmallMenu ? (
							<IconX size={20} color="black" />
						) : (
							<IconBurger size={20} color="black" />
						)}
					</div>
				</div>
				{showSmallMenu && (
					<>
						<div className="fixed inset-0 bg-black bg-opacity-70" />
						<div className="bg-white w-full flex flex-col z-20 px-6 py-5 space-y-4">
							<div>
								<div
									className="flex items-center justify-between cursor-pointer"
									onClick={() => setAboutMenuSmall((prev) => !prev)}
								>
									<p className="font-semibold text-sm">About</p>
									<IconDown size={20} color="black" />
								</div>
								{aboutMenuSmall && (
									<div className="w-full cursor-pointer">
										<p className="py-4 px-5 flex items-center cursor-pointer hover:text-neutral-25 text-sm">
											<IconStar size={24} color="#FF731C" className="w-10" />
											Vision
										</p>
									</div>
								)}
							</div>
							<div>
								<div
									className="flex items-center justify-between cursor-pointer"
									onClick={() => setProductMenuSmall((prev) => !prev)}
								>
									<p className="font-semibold text-sm">Products</p>
									<IconDown size={20} color="black" />
								</div>
								{productMenuSmall && (
									<div className="w-full cursor-pointer">
										<p className="py-2 px-5 flex items-center cursor-pointer hover:text-neutral-25 text-sm">
											<IconTicket size={24} color="#FF731C" className="w-10" />
											Pipapo Ticket
										</p>
										<p className="py-2 px-5 flex items-center cursor-pointer hover:text-neutral-25 text-sm">
											<IconDashboard
												size={24}
												color="#FF731C"
												className="w-10"
											/>
											Pipapo Dashboard
										</p>
									</div>
								)}
							</div>
							<div>
								<div
									className="flex items-center justify-between cursor-pointer"
									onClick={() => setDeveloperMenuSmall((prev) => !prev)}
								>
									<p className="font-semibold text-sm">Developer</p>
									<IconDown size={20} color="black" />
								</div>
								{developerMenuSmall && (
									<div className="w-full cursor-pointer">
										<p className="py-2 px-5 flex items-center cursor-pointer hover:text-neutral-25 text-sm">
											<IconGithub size={24} color="#FF731C" className="w-10" />
											Github
										</p>
									</div>
								)}
							</div>
							<div>
								<div
									className="flex items-center justify-between cursor-pointer"
									onClick={() => setCommunityMenuSmall((prev) => !prev)}
								>
									<p className="font-semibold text-sm">Community</p>
									<IconDown size={20} color="black" />
								</div>
								{communityMenuSmall && (
									<div className="w-full cursor-pointer">
										<p className="py-2 px-5 flex items-center cursor-pointer hover:text-neutral-25 text-sm">
											<IconDiscord size={24} color="#FF731C" className="w-10" />
											Discord
										</p>
										<p className="py-2 px-5 flex items-center cursor-pointer hover:text-neutral-25 text-sm">
											<IconTelegram
												size={24}
												color="#FF731C"
												className="w-10"
											/>
											Telegram
										</p>
										<p className="py-2 px-5 flex items-center cursor-pointer hover:text-neutral-25 text-sm">
											<IconTwitter size={24} color="#FF731C" className="w-10" />
											Twitter
										</p>
									</div>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	)
}

export default LandingNav
