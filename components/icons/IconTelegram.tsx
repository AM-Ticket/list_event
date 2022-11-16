import React from 'react'
import { IconProps } from '../../interfaces/IconProps'

const IconTelegram = (props: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
			width={props.size}
			height={props.size}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke={props.color}
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
		</svg>
	)
}

export default IconTelegram
