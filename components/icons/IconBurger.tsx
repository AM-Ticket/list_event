import React from 'react'
import { IconProps } from '../../interfaces/IconProps'

const IconBurger = (props: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
			width={props.size}
			height={props.size}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke={props.color}
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<line x1={4} y1={6} x2={20} y2={6} />
			<line x1={4} y1={12} x2={20} y2={12} />
			<line x1={4} y1={18} x2={20} y2={18} />
		</svg>
	)
}

export default IconBurger
