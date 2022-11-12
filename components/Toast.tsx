import clsx from 'clsx'

interface ToastProps {
	type: 'success' | 'error'
	text: string
	show: boolean
}

const Toast = (props: ToastProps) => {
	if (!props.show) return null
	return (
		<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 font-semibold text-sm">
			<div
				className={clsx(
					`rounded-xl px-10 py-3`,
					props.type === 'success' &&
						`bg-green-200 text-green-600 border-2 border-green-700`,
					props.type === 'error' &&
						`bg-red-200 text-red-600 border-2 border-red-700`
				)}
			>
				<p>{props.text}</p>
			</div>
		</div>
	)
}

export default Toast
