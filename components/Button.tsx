// @ts-nocheck
import clsx from 'clsx'
import IconSpin from './icons/IconSpin'

interface ButtonProps {
	children: React.ReactNode
	color: 'primary' | 'white' | 'black' | 'transparent' | 'base' | 'paras-blue'
	rounded?: 'sm' | 'lg' | 'xl'
	size?: 'sm' | 'base' | 'lg'
	className?: string
	onClickHandler?: Function
	isFullWidth?: boolean
	prefixIcon?: React.ReactNode
	isDisabled?: boolean
	isLoading?: boolean
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
			return `bg-black text-white hover:bg-opacity-60`
		else if (props.color === 'white')
			return `bg-white text-black hover:bg-neutral-60`
		else if (props.color === 'transparent')
			return `bg-transparent border-2 border-black text-black hover:text-opacity-60 hover:border-opactity-60`
		else if (props.color === 'base')
			return `bg-base text-black hover:bg-opacity-60`
		else if (props.color === 'paras-blue')
			return `bg-[#0000ba] text-white hover:bg-opacity-50`
	}

	return (
		<button
			disabled={props.isDisabled}
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
			{props.isLoading ? (
				<IconSpin size={20} color="white" />
			) : (
				<>
					{props.prefixIcon}
					{props.children}
				</>
			)}
		</button>
	)
}

export default Button
