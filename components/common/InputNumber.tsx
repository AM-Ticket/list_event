import clsx from 'clsx'
import { ChangeEventHandler, forwardRef } from 'react'

interface IInputNumberProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	value?: number
	defaultValue?: number
	onChange?: ChangeEventHandler<HTMLInputElement>
	label?: string
	isFullWidth?: boolean
	preffixIcon?: JSX.Element
	className?: string
	isError?: boolean
	errorMessage?: string
	placeholder?: string
}

const InputNumber = forwardRef<HTMLInputElement, IInputNumberProps>(
	(props, ref) => {
		return (
			<div>
				<p className="mb-1 text-sm text-black font-bold">{props.label}</p>
				<div id="input" className={clsx(`relative`, props.className)}>
					{props.preffixIcon && (
						<div className="absolute left-3 top-[30%]">{props.preffixIcon}</div>
					)}
					<input
						ref={ref}
						name={props.name}
						type="number"
						value={props.value}
						className={clsx(
							`py-1 px-1 rounded-lg border-2 border-black font-bold text-xl`,
							props.isFullWidth ? `w-full` : `w-16`,
							props.preffixIcon ? `pl-8` : `pl-2`
						)}
						onChange={props.onChange}
						placeholder={props.placeholder}
					/>
				</div>
				{props.isError && (
					<p className="text-xs text-red-500">{props.errorMessage}</p>
				)}
			</div>
		)
	}
)

InputNumber.displayName = 'InputNumber'

export default InputNumber
