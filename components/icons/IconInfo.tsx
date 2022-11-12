import React from 'react'
import { IconProps } from '../../interfaces/IconProps'

const IconInfo = (props: IconProps) => {
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
			<circle cx={12} cy={12} r={9} />
			<line x1={12} y1={8} x2="12.01" y2={8} />
			<polyline points="11 12 12 12 12 16 13 16" />
		</svg>
	)
}

export default IconInfo
