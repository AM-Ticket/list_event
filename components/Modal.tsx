import clsx from 'clsx'
import { useEffect, useRef } from 'react'

interface ModalProps {
	isShow: boolean
	onClose: () => void
	children: React.ReactNode
	closeOnEscape?: boolean
	closeOnBgClick?: boolean
	className?: string
}

const Modal = (props: ModalProps) => {
	const { closeOnEscape = true } = props
	const modalRef = useRef(null)

	useEffect(() => {
		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				props.onClose()
			}
		}
		if (closeOnEscape && props.isShow) {
			document.addEventListener('keydown', onKeydown)
		}

		return () => {
			document.removeEventListener('keydown', onKeydown)
		}
	}, [props.onClose, closeOnEscape, props.isShow])

	const bgClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === modalRef.current && props.closeOnBgClick) {
			props.onClose()
		}
	}

	if (!props.isShow) return null

	return (
		<div
			className={clsx(
				`z-[100] fixed inset-0 bg-black bg-opacity-60 p-4 flex items-center`,
				props.className
			)}
			onClick={(e) => bgClick(e)}
		>
			{props.children}
		</div>
	)
}

export default Modal
