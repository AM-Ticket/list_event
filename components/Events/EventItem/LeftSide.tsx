import IconLike from '../../icons/IconLike'
import IconShare from '../../icons/IconShare'

const LeftSide = () => {
	return (
		<div className="inset-y-0 w-12 rounded-xl bg-base hidden md:flex flex-col items-center space-y-4 p-6">
			<div className="w-8 h-8 rounded-full bg-neutral-60 bg-opacity-70 hover:bg-opacity-50 transition cursor-pointer flex items-center justify-center">
				<IconLike size={16} color="#393939" />
			</div>
			<div className="w-8 h-8 rounded-full bg-neutral-60 bg-opacity-70 hover:bg-opacity-50 transition cursor-pointer flex items-center justify-center">
				<IconShare size={16} color="#393939" />
			</div>
		</div>
	)
}

export default LeftSide
