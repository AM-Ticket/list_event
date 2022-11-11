import clsx from 'clsx'
import { forwardRef } from 'react'

interface IInputNewProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	value?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	label?: string
	placeholder?: string
	isFullWidth?: boolean
	preffixIcon?: JSX.Element
	suffixIcon?: JSX.Element
	className?: string
	isError?: boolean
	errorMessage?: string
	autoComplete?: string
}

const InputNew = forwardRef<HTMLInputElement, IInputNewProps>((props, ref) => {
	return (
		<div>
			<p className="mb-1 text-sm text-black font-bold">{props.label}</p>
			<div id="input" className={clsx(`relative`, props.className)}>
				{props.preffixIcon && (
					<div className="absolute left-3 top-[30%]">{props.preffixIcon}</div>
				)}
				<input
					type="text"
					name={props.name}
					ref={ref}
					value={props.value}
					className={clsx(
						`py-2 px-1 rounded-xl outline-none border-2 border-black focus:border-2 focus:border-primary`,
						props.isFullWidth ? `w-full` : `w-auto`,
						props.preffixIcon ? `pl-7` : `pl-2`,
						props.suffixIcon ? `pr-7` : `pr-2`
					)}
					placeholder={props.placeholder}
					autoComplete={props.autoComplete || 'off'}
					onChange={props.onChange}
				/>
				{props.suffixIcon && (
					<div className="absolute right-2 top-[30%]">{props.suffixIcon}</div>
				)}
			</div>
			{props.isError && (
				<p className="text-xs text-red-500">{props.errorMessage}</p>
			)}
		</div>
	)
})

InputNew.displayName = `InputNew`

export default InputNew
