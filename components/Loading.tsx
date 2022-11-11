import IconSpin from './icons/IconSpin'

const Loading = ({ isShow }: { isShow: boolean }) => {
	if (isShow)
		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
				<IconSpin size={32} color="white" />
			</div>
		)
	return null
}

export default Loading
