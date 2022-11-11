import clsx from 'clsx'
import React, { forwardRef } from 'react'

interface IUploadProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	label?: string
	isFullWidth?: boolean
	preffixIcon?: JSX.Element
	className?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Upload = forwardRef<HTMLInputElement, IUploadProps>((props, ref) => {
	return (
		<div className={clsx(`relative`, props.className)}>
			<div className="absolute left-3 top-[30%]">{props.preffixIcon}</div>
			<label
				htmlFor={props.name}
				className={clsx(
					`flex flex-wrap rounded-lg border-2 border-black py-2 px-1 cursor-pointer text-contra-base-100 font-bold`,
					props.isFullWidth ? `w-full` : `w-52`,
					props.preffixIcon ? `pl-8` : `pl-2`
				)}
			>
				<p>{props.label}</p>
				<input
					ref={ref}
					name={props.name}
					type="file"
					id={props.name}
					className="hidden"
					onChange={props.onChange}
					accept="image/*,video/*"
				/>
			</label>
		</div>
	)
})

Upload.displayName = 'Upload'

export default Upload
