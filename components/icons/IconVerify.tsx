import React from 'react'
import { IconProps } from '../../interfaces/IconProps'

const IconVerify = (props: IconProps) => {
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
			<circle cx={10} cy={10} r={7} />
			<path d="M21 21l-6 -6" />
			<path d="M7 10l2 2l4 -4" />
		</svg>
	)
}

export default IconVerify
