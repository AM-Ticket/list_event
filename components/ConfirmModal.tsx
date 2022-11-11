import Button from './Button'
import IconX from './icons/IconX'
import Modal from './Modal'

interface ConfirmModalProps {
	isShow: boolean
	onClose: () => void
	onClick: any
	title?: string
	content?: React.ReactNode
	isLoading?: boolean
}

const ConfirmModal = (props: ConfirmModalProps) => {
	return (
		<Modal isShow={props.isShow} onClose={props.onClose}>
			<div className="max-w-[400px] h-60 mx-auto rounded-xl bg-base p-8 relative flex flex-col items-center">
				<div
					className="absolute top-3 right-3 cursor-pointer"
					onClick={props.onClose}
				>
					<IconX size={20} color="#393939" />
				</div>
				<p className="font-extrabold text-2xl text-textDark mb-6">
					{props.title}
				</p>
				<div className="flex flex-col justify-around h-full">
					{props.content}
					<div className="flex items-center justify-between w-full">
						<Button
							isLoading={props.isLoading}
							isDisabled={props.isLoading}
							onClickHandler={props.onClick}
							color="primary"
							isFullWidth
						>
							Create
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default ConfirmModal
