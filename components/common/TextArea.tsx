import clsx from 'clsx'
import { ChangeEventHandler, forwardRef } from 'react'

interface ITextAreaProps
	extends React.DetailedHTMLProps<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	value?: string
	onChange?: ChangeEventHandler<HTMLTextAreaElement>
	label?: string
	placeholder?: string
	isFullWidth?: boolean
	className?: string
	isError?: boolean
	errorMessage?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
	(props, ref) => {
		return (
			<div>
				<p className="mb-1 text-sm text-black font-bold">{props.label}</p>
				<div id="textarea" className={clsx(`relative`, props.className)}>
					<textarea
						ref={ref}
						name={props.name}
						value={props.value}
						className={clsx(
							`py-1 px-1 rounded-lg outline-none border-2 border-black focus:border-2 focus:border-primary`,
							props.isFullWidth ? `w-full` : `w-auto`
						)}
						placeholder={props.placeholder}
						onChange={props.onChange}
						rows={4}
					/>
				</div>
				{props.isError && (
					<p className="text-xs text-red-500">{props.errorMessage}</p>
				)}
			</div>
		)
	}
)

TextArea.displayName = 'TextArea'

export default TextArea
