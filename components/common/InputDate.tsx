import clsx from 'clsx'
import IconCalendar from '../icons/IconCalendar'
import { ChangeEventHandler, forwardRef } from 'react'

interface IInputDateProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
	label?: string
	placeholder?: string
	isFullWidth?: boolean
	className?: string
}

const InputDate = forwardRef<HTMLInputElement, IInputDateProps>(
	(props, ref) => {
		return (
			<div>
				<p className="mb-1 text-sm text-black font-bold">{props.label}</p>
				<div id="inputDate" className={clsx(`relative`, props.className)}>
					<div className="absolute left-3 top-[30%]">
						<IconCalendar size={16} color="black" />
					</div>
					<input
						ref={ref}
						name={props.name}
						type="date"
						value={props.value}
						className={clsx(
							`py-1 px-1 rounded-lg border-2 border-black pl-7`,
							props.isFullWidth ? `w-full` : `w-auto`
						)}
						placeholder={props.placeholder}
						onChange={props.onChange}
					/>
				</div>
			</div>
		)
	}
)

InputDate.displayName = 'InputDate'

export default InputDate
