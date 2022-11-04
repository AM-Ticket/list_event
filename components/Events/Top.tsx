import { useNear } from '../../contexts/near'
import Button from '../Button'
import IconSearch from '../icons/IconSearch'

const NavbarTop = () => {
	const { near, wallet, signIn } = useNear()
	const accountId = wallet?.getAccountId() || null

	return (
		<div className="lg:flex justify-between items-center px-5 mb-6 hidden">
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
			<div className="flex">
				<div className="my-auto mx-1 font-semibold">{accountId}</div>
				{accountId ? (
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
