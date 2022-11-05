interface IconSpinProps {
	size: number
	color: string
	className?: string
}

const IconSpin = ({ size = 24, color = 'white', className }: IconSpinProps) => {
	return (
		<svg
			className={`animate-spin ${className}`}
			width={size}
			height={size}
			viewBox="0 0 120 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				opacity="0.1"
				d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM18 60C18 83.196 36.804 102 60 102C83.196 102 102 83.196 102 60C102 36.804 83.196 18 60 18C36.804 18 18 36.804 18 60Z"
				fill={color}
			/>
			<path
				d="M120 60C120 52.1207 118.448 44.3185 115.433 37.039C112.417 29.7595 107.998 23.1451 102.426 17.5736C96.8549 12.0021 90.2405 7.58251 82.961 4.56723C75.6815 1.55195 67.8793 -3.44416e-07 60 0L60 18C65.5155 18 70.977 19.0864 76.0727 21.1971C81.1684 23.3078 85.7984 26.4015 89.6985 30.3015C93.5985 34.2016 96.6922 38.8316 98.8029 43.9273C100.914 49.023 102 54.4845 102 60H120Z"
				fill={color}
			/>
		</svg>
	)
}

export default IconSpin
