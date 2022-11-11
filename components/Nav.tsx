import IconEvents from '../components/icons/IconEvents'
import clsx from 'clsx'
import IconPublications from './icons/IconPublications'
import IconFaq from './icons/IconFaq'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import IconBurger from './icons/IconBurger'
import Button from './Button'
import IconX from './icons/IconX'
import { useNear } from '../contexts/near'
import IconUp from './icons/IconUp'
import IconDown from './icons/IconDown'
import { motion, Variants } from 'framer-motion'
import IconVerify from './icons/IconVerify'
import IconPlus from './icons/IconPlus'
import IconTicket from './icons/IconTicket'

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
		<motion.div
			initial={screen === 'mobile' && { width: 0 }}
			animate={
				screen === 'mobile' && {
					width: 280,
				}
			}
			transition={{ duration: 0.3 }}
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
					<IconEvents size={20} color="#FF731C" />
					<p>Events</p>
				</div>
				<div
					className={clsx(
						`flex items-center text-textDark space-x-2 hover:bg-primary hover:bg-opacity-10 transition cursor-pointer p-3`,
						currTab.includes('publications') && `border-l-4 border-primary`
					)}
					onClick={() => handleClickTab(`publications`)}
				>
					<IconPublications size={20} color="#FF731C" />
					<p>Publications</p>
				</div>
				<div
					className={clsx(
						`flex items-center text-textDark space-x-2 hover:bg-primary hover:bg-opacity-10 transition cursor-pointer p-3`,
						currTab.includes('faq') && `border-l-4 border-primary`
					)}
					onClick={() => handleClickTab(`faq`)}
				>
					<IconFaq size={20} color="#FF731C" />
					<p>FAQ</p>
				</div>
			</div>
		</motion.div>
	)
}

const Nav = () => {
	const { generateAuthToken, authToken, wallet, signIn } = useNear()
	const accountId = (wallet?.isSignedIn() && wallet?.getAccountId()) || null
	const router = useRouter()
	useEffect(() => {
		const run = async () => {
			if (accountId && !authToken) {
				await generateAuthToken?.()
			}
		}
		run().catch(console.error)
	}, [accountId])
	const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false)
	const [showMenu, setShowMenu] = useState<boolean>(false)
	return (
		<>
			<NavSection screen="desktop" />
			<div className="flex items-center justify-between fixed lg:hidden bg-white p-4 top-0 inset-x-0 z-50">
				<div className="flex items-center space-x-4">
					<div
						className="cursor-pointer"
						onClick={() => setShowNavbarMobile(true)}
					>
						<IconBurger size={20} color="black" />
					</div>
				</div>
				<div className="flex">
					{accountId ? (
						<div className="relative flex">
							<div
								className="flex items-center space-x-2 cursor-pointer"
								onClick={() => setShowMenu((prev) => !prev)}
							>
								<div className="my-auto mx-1 font-semibold">{accountId}</div>
								{showMenu ? (
									<IconUp size={16} color="#393939" />
								) : (
									<IconDown size={16} color="#393939" />
								)}
							</div>
							{showMenu && (
								<div className="absolute top-8 right-0 rounded-xl bg-white shadow-xl flex flex-col space-y-4 min-w-[208px] p-6 z-40">
									<Button
										onClickHandler={() => {
											router.push('/verify-qr')
										}}
										color="base"
										size="lg"
										prefixIcon={
											<IconVerify size={20} color="#FF731C" className="mx-1" />
										}
									>
										Verify Ticket
									</Button>
									<Button
										onClickHandler={() => {
											router.push('/create-an-event')
										}}
										color="base"
										size="lg"
										prefixIcon={
											<IconPlus size={20} color="#FF731C" className="mx-1" />
										}
									>
										Create an Event
									</Button>
									<Button
										onClickHandler={() => {
											router.push('/my-tickets')
										}}
										color="base"
										size="lg"
										prefixIcon={
											<IconTicket size={20} color="#FF731C" className="mx-1" />
										}
									>
										My Tickets
									</Button>
									<Button
										onClickHandler={() => {
											wallet?.signOut()
											location.replace('/')
										}}
										color="primary"
										size="lg"
									>
										Sign Out
									</Button>
								</div>
							)}
						</div>
					) : (
						<Button onClickHandler={signIn} color="primary" size="lg">
							Connect Wallet
						</Button>
					)}
				</div>
			</div>
			{showNavbarMobile && (
				<div className="fixed bg-black bg-opacity-30 inset-0 z-50">
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
