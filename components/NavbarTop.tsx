import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useNear } from '../contexts/near'
import Button from './Button'
import IconChevronDown from './icons/IconDown'
import IconChevronUp from './icons/IconUp'
import IconSearch from './icons/IconSearch'
import IconPlus from './icons/IconPlus'
import IconVerify from './icons/IconVerify'
import IconTicket from './icons/IconTicket'

const NavbarTop = () => {
	const { near, wallet, signIn } = useNear()
	const accountId = wallet?.getAccountId() || null
	const router = useRouter()
	const [showMenu, setShowMenu] = useState<boolean>(false)
	return (
		<div
			className={clsx(
				`lg:flex items-center mb-6 hidden`,
				router.asPath === '/events' ? `justify-between` : `justify-end`
			)}
		>
			{router.asPath === '/events' && (
				<div className="relative flex items-center">
					<input
						type="text"
						placeholder="find event"
						className="appearance-none bg-white shadow-xl rounded-xl p-3 pl-10 w-[489px] h-12 focus:outline-none focus:border-textDark focus:ring-textDark"
					/>
					<IconSearch
						className="absolute left-4 top-4"
						color="#969BAB"
						size={20}
					/>
				</div>
			)}
			<div className="flex">
				{accountId ? (
					<div className="relative flex">
						<div
							className="flex items-center space-x-2 cursor-pointer bg-white p-3 rounded-xl shadow-xl"
							onClick={() => setShowMenu((prev) => !prev)}
						>
							<div className="my-auto mx-1 font-semibold">{accountId}</div>
							{showMenu ? (
								<IconChevronUp size={16} color="#393939" />
							) : (
								<IconChevronDown size={16} color="#393939" />
							)}
						</div>
						{showMenu && (
							<div className="absolute top-14 right-0 rounded-xl bg-white shadow-xl flex flex-col space-y-4 min-w-[208px] p-6 z-40">
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
	)
}

export default NavbarTop
