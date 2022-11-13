interface IconNearProps {
	size: number
	color: string
	className?: string
}

const IconNear = ({ size, color, className }: IconNearProps) => {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M4.4 5.46034V10.701L5.80169 9.71504C6.1272 9.48609 6.53237 9.8724 6.31048 10.2002L4.14808 13.3942C3.93062 13.7154 3.56453 13.9083 3.1725 13.9083C2.52494 13.9083 2 13.3914 2 12.7538V3.776C2 2.1005 4.14265 1.36038 5.20556 2.66873L11.6 10.5397V5.29905L10.1983 6.28496C9.8728 6.51392 9.46763 6.1276 9.68952 5.79985L11.8519 2.6058C12.0694 2.2846 12.4355 2.09167 12.8275 2.09167C13.4751 2.09167 14 2.60859 14 3.24625V12.224C14 13.8995 11.8574 14.6396 10.7944 13.3313L4.4 5.46034Z"
				fill={color}
			/>
		</svg>
	)
}

export default IconNear
