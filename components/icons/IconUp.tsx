import React from 'react'
import { IconProps } from '../../interfaces/IconProps'

const IconUp = (props: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
			width={props.size}
			height={props.size}
			viewBox="0 0 24 24"
			strokeWidth="3"
			stroke={props.color}
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<polyline points="6 15 12 9 18 15" />
		</svg>
	)
}

export default IconUp
