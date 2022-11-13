import { signIn as signInRamp } from '@ramper/near'
import { IMG_NEAR_URL, IMG_RAMPER_URL } from '../constants/url'
import { useNear } from '../contexts/near'
import { useRamperProvider } from '../contexts/RamperProvider'
import Button from './Button'
import IconX from './icons/IconX'
import Modal from './Modal'

interface LoginModalProps {
	isShow: boolean
	onClose: () => void
	isLoading?: boolean
}

const LoginModal = (props: LoginModalProps) => {
	const { wallet, signIn } = useNear()
	const { signInRamper, userRamper } = useRamperProvider()
	return (
		<Modal isShow={props.isShow} onClose={props.onClose}>
			<div className="max-w-[400px] mx-auto rounded-xl bg-base p-8 relative flex flex-col items-center">
				<div
					className="absolute top-3 right-3 cursor-pointer"
					onClick={props.onClose}
				>
					<IconX size={20} color="#393939" />
				</div>
				<p className="font-extrabold text-2xl text-textDark mb-6">Login</p>
				<div className="flex items-center justify-center space-y-4 w-full flex-wrap">
					<div
						className="flex items-center justify-center text-center w-full py-4 border-2 shadow-xl hover:scale-105 transition-all cursor-pointer border-black rounded-xl"
						onClick={() => {
							signIn?.()
							localStorage.setItem('ACTIVE_WALLET', 'near-wallet')
							props.onClose()
						}}
					>
						Login with{' '}
						<span>
							<img src={IMG_NEAR_URL} className="w-20 mx-1" alt="" />
						</span>
					</div>
					<div
						className="flex items-center justify-center text-center w-full py-4 border-2 shadow-xl hover:scale-105 transition-all cursor-pointer border-black rounded-xl"
						onClick={() => {
							signInRamper?.()
							props.onClose()
						}}
					>
						Login with Email{` `}
						<span>
							<img src={IMG_RAMPER_URL} alt="" className="w-20 mx-1" />
						</span>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default LoginModal
