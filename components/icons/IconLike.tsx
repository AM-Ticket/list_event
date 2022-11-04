import React from 'react'
import { IconProps } from '../../interfaces/IconProps'

const IconLike = (props: IconProps) => {
	return (
		<svg
			width={props.size}
			height={props.size}
			viewBox="0 0 28 31"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
		>
			<path
				d="M8.75001 5.70239C5.20626 5.70239 2.33334 8.76 2.33334 12.5316C2.33334 19.3607 9.91668 25.5691 14 27.0131C18.0833 25.5691 25.6667 19.3607 25.6667 12.5316C25.6667 8.76 22.7938 5.70239 19.25 5.70239C17.08 5.70239 15.1608 6.84907 14 8.60417C13.4083 7.70719 12.6223 6.97516 11.7084 6.47005C10.7945 5.96493 9.77977 5.70162 8.75001 5.70239Z"
				stroke={props.color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

export default IconLike
