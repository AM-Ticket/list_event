import clsx from 'clsx'
import { useRouter } from 'next/router'
import Button from './Button'
import IconSearch from './icons/IconSearch'

const NavbarTop = () => {
	const router = useRouter()
	return (
		<div
			className={clsx(
				`lg:flex items-center px-5 mb-6 hidden`,
				router.asPath === '/events' ? `justify-between` : `justify-end`
			)}
		>
			{router.asPath === '/events' && (
				<div className="relative">
					<input
						type="text"
						placeholder="find event"
						className="appearance-none border-2 border-border rounded-lg p-3 pl-10 w-[489px] h-10 bg-opacity-0 bg-base"
					/>
					<IconSearch
						className="absolute left-4 top-3"
						color="#C4C4C6"
						size={20}
					/>
				</div>
			)}
			<Button color="primary" size="lg">
				Connect Wallet
			</Button>
		</div>
	)
}

export default NavbarTop
