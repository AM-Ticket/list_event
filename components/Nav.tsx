// @ts-nocheck
import IconEvents from '../components/icons/IconEvents'
import clsx from 'clsx'
import IconPublications from './icons/IconPublications'
import IconFaq from './icons/IconFaq'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import IconBurger from './icons/IconBurger'
import IconSearch from './icons/IconSearch'
import Button from './Button'
import IconX from './icons/IconX'
import dynamic from 'next/dynamic'
import { useNear } from '../contexts/near'

const NavSection = ({
	screen = 'mobile',
	onClose,
	isShow,
}: {
	screen: 'desktop' | 'mobile'
	onClose?: () => void
	isShow?: boolean
}) => {
	const router = useRouter()
	const currTab = router.asPath
	const handleClickTab = (route: string) => router.push(`/${route}`)
	return (
		<div
			className={clsx(
				`bg-white h-screen lg:flex flex-col py-8 shadow-xl`,
				screen === 'desktop' ? `w-[320px]` : `w-[280px]`,
				screen === 'desktop' ? `hidden md:fixed` : isShow ? `fixed` : `hidden`
			)}
		>
			{screen === 'mobile' && (
				<div
					className="font-bold text-xl cursor-pointer absolute top-4 right-4"
					onClick={onClose}
				>
					<IconX size={18} color="#393939" />
				</div>
			)}
			<div className="flex items-center mb-8 px-5">
				<img
					src="/pipapo.jpeg"
					className="w-16 h-16 rounded-full object-contain"
				/>
			</div>
			<div className="font-semibold space-y-4">
				<div
					className={clsx(
						`flex items-center text-textDark space-x-2 hover:bg-primary hover:bg-opacity-10 transition cursor-pointer p-3`,
						currTab.includes('events') && `border-l-4 border-primary`
					)}
					onClick={() => handleClickTab(`events`)}
				>
					<IconEvents size={20} color="#393939" />
					<p>Events</p>
				</div>
				<div
					className={clsx(
						`flex items-center text-textDark space-x-2 hover:bg-primary hover:bg-opacity-10 transition cursor-pointer p-3`,
						currTab.includes('publications') && `border-l-4 border-primary`
					)}
					onClick={() => handleClickTab(`publications`)}
				>
					<IconPublications size={20} color="#393939" />
					<p>Publications</p>
				</div>
				<div
					className={clsx(
						`flex items-center text-textDark space-x-2 hover:bg-primary hover:bg-opacity-10 transition cursor-pointer p-3`,
						currTab.includes('faq') && `border-l-4 border-primary`
					)}
					onClick={() => handleClickTab(`faq`)}
				>
					<IconFaq size={20} color="#393939" />
					<p>FAQ</p>
				</div>
			</div>
		</div>
	)
}

const Nav = () => {
	const { near, wallet, signIn } = useNear()
	const accountId = (wallet?.isSignedIn() && wallet?.getAccountId()) || null
	const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false)
	return (
		<>
			<NavSection screen="desktop" />
			<div className="flex items-center justify-between fixed lg:hidden w-full bg-white p-4">
				<div className="flex items-center space-x-4">
					<div
						className="cursor-pointer"
						onClick={() => setShowNavbarMobile(true)}
					>
						<IconBurger size={20} color="black" />
					</div>
					<div className="relative">
						<input
							type="text"
							placeholder="find event"
							className="appearance-none border-2 border-border rounded-lg p-3 pl-7 w-44 h-9 bg-opacity-0 bg-base"
						/>
						<IconSearch
							className="absolute left-2 top-3"
							color="#C4C4C6"
							size={14}
						/>
					</div>
				</div>
				<div className="flex">
					<div className="my-auto mx-1 font-semibold">{accountId}</div>
					{accountId ? (
						<Button
							onClickHandler={() => {
								wallet?.signOut()
								location.replace('/')
							}}
							color="primary"
							size="sm"
						>
							Sign Out
						</Button>
					) : (
						<Button onClickHandler={signIn} color="primary" size="sm">
							Connect Wallet
						</Button>
					)}
				</div>
			</div>
			{showNavbarMobile && (
				<div className="fixed bg-black bg-opacity-30 inset-0">
					<NavSection
						screen="mobile"
						onClose={() => setShowNavbarMobile(false)}
						isShow={showNavbarMobile}
					/>
				</div>
			)}
		</>
	)
}

export default Nav
