import IconSpin from './icons/IconSpin'

const Loading = ({ isShow, text }: { isShow: boolean; text?: string }) => {
	if (isShow)
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
				<p className="font-semibold text-white">{text}</p>
				<IconSpin size={32} color="white" />
			</div>
		)
	return null
}

export default Loading
