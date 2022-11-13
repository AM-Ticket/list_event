import Button from './Button'
import Modal from './Modal'

interface SignMessageRamperModalProps {
	isShow: boolean
	onClick: () => void
}

const SignMessageRamperModal = (props: SignMessageRamperModalProps) => {
	return (
		<Modal
			isShow={props.isShow}
			onClose={() => null}
			closeOnBgClick={false}
			closeOnEscape={false}
		>
			<div className="w-[360px] mx-auto bg-white rounded-lg p-6 relative">
				<p className="flex items-center text-sm text-neutral-50 text-left">
					{`You need to verify your account by signing in. Click "Sign" below and click "Send" in the
					pop-up. Please allow pop-ups for this website if you don't see one.`}
				</p>
				<div className="bg-white flex items-center w-full z-20 mt-4">
					<div className="w-6/12">
						<Button isFullWidth color="primary" onClickHandler={props.onClick}>
							Sign
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default SignMessageRamperModal
