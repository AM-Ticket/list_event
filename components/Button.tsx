// @ts-nocheck
import clsx from 'clsx'

interface ButtonProps {
	children: React.ReactNode
	color: 'primary' | 'white' | 'black'
	rounded?: 'sm' | 'lg' | 'xl'
	size?: 'sm' | 'base' | 'lg'
	className?: string
	onClickHandler?: Function
	isFullWidth?: boolean
}

const Button = (props: ButtonProps) => {
	const { rounded = 'lg', size = 'base' } = props

	const getSize = () => {
		if (size === 'sm') return `px-3 py-2 text-xs`
		else if (size === 'base') return `px-5 py-2 text-sm`
		else if (size === 'lg') return `px-8 py-2 text-base`
	}

	const getColor = () => {
		if (props.color === 'primary')
			return `bg-primary text-white hover:bg-opacity-50`
		else if (props.color === 'black')
			return `bg-black text-white hover:bg-white hover:text-black`
		else if (props.color === 'white')
			return `bg-white text-black hover:bg-black hover:text-white`
	}

	return (
		<button
			onClick={props.onClickHandler}
			className={clsx(
				props.className,
				`flex items-center justify-center transition font-semibold whitespace-nowrap`,
				`rounded-${rounded}`,
				props.isFullWidth && `w-full`,
				getColor(),
				getSize()
			)}
		>
			{props.children}
		</button>
	)
}

export default Button
