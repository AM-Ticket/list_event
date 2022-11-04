import Button from '../Button'
import IconSearch from '../icons/IconSearch'

const NavbarTop = () => {
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
			<Button color="primary" size="lg">
				Connect Wallet
			</Button>
		</div>
	)
}

export default NavbarTop
