interface IconUploadProps {
	size: number
	color: string
	className?: string
}

const IconUpload = (props: IconUploadProps) => {
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
			<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
			<polyline points="7 9 12 4 17 9" />
			<line x1={12} y1={4} x2={12} y2={16} />
		</svg>
	)
}

export default IconUpload
