import IconX from './icons/IconX'
import Modal from './Modal'
import QRCode from 'react-qr-code'

interface QRModalProps {
	isShow: boolean
	value: string
	title: string
	onClose: () => void
}

const QRModal = (props: QRModalProps) => {
	return (
		<Modal isShow={props.isShow} onClose={props.onClose}>
			<div className="w-[600px] mx-auto rounded-xl bg-base p-12 relative flex flex-col items-center">
				<div
					className="absolute top-5 right-5 cursor-pointer"
					onClick={props.onClose}
				>
					<IconX size={20} color="#393939" />
				</div>
				<p className="font-extrabold text-2xl text-textDark mb-10">
					{props.title}
				</p>
				<div className="flex items-center justify-center">
					<div className="max-w-[250px] w-full">
						<QRCode
							size={250}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={props.value}
							viewBox={`0 0 256 256`}
						/>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default QRModal
