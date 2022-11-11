const SplashLoader = ({ isLoading }: { isLoading: boolean }) => {
	return (
		<div
			className={`transition-opacity duration-150 fixed inset-0 z-50 bg-base flex items-center justify-center ${
				isLoading ? `opacity-100` : `opacity-0 z-[-1]`
			}`}
		>
			<LogoBounce />
		</div>
	)
}

interface LogoBounceProps {
	className?: string
	width?: number
}

export const LogoBounce = ({ className = '', width = 80 }: LogoBounceProps) => (
	<div className={`animate-bounce ${className}`}>
		<img
			src="/pipapo.jpeg"
			className="w-40 h-40 rounded-full object-contain"
			alt=""
		/>
		{/* <svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={80}
			viewBox="0 0 1280.000000 1280.000000"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
				fill="#FF731C"
				stroke="none"
			>
				<path
					d="M9000 6236 c0 -2 8 -10 18 -17 15 -13 16 -12 3 4 -13 16 -21 21 -21
13z"
				/>
				<path d="M4610 6021 c0 -6 4 -13 10 -16 6 -3 7 1 4 9 -7 18 -14 21 -14 7z" />
			</g>
		</svg> */}
	</div>
)

export default SplashLoader
