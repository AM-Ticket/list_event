import { ChangeEvent } from 'react'

interface CheckboxProps {
	checked: boolean
	label: string
	id: string
	onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
	index: number
}

const Checkbox = (props: CheckboxProps) => {
	return (
		<div className="flex items-center space-x-2">
			<input
				id={props.id}
				type="checkbox"
				className="w-6 h-6"
				checked={props.checked}
				onChange={(e) => props.onChange(e, props.index)}
			/>
			<label htmlFor={props.id}>{props.label}</label>
		</div>
	)
}

export default Checkbox
