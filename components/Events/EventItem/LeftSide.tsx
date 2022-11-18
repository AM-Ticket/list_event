import { useState } from 'react'
import { IFormSchema } from '../../../interfaces/api/schema'
import IconLike from '../../icons/IconLike'
import IconShare from '../../icons/IconShare'
import ShareModal from '../../ShareModal'

const LeftSide = ({ data }: { data: IFormSchema }) => {
	const [shareModal, setShareModal] = useState<boolean>(false)
	return (
		<div className="inset-y-0 w-12 rounded-xl bg-base hidden md:flex flex-col items-center space-y-4 p-6">
			<ShareModal
				isShow={shareModal}
				onClose={() => setShareModal(false)}
				data={data}
			/>
			<div className="w-8 h-8 rounded-full bg-neutral-60 bg-opacity-70 hover:bg-opacity-50 transition cursor-pointer flex items-center justify-center">
				<IconLike size={16} color="#FF731C" />
			</div>
			<div
				className="w-8 h-8 rounded-full bg-neutral-60 bg-opacity-70 hover:bg-opacity-50 transition cursor-pointer flex items-center justify-center"
				onClick={() => setShareModal(true)}
			>
				<IconShare size={16} color="#FF731C" />
			</div>
		</div>
	)
}

export default LeftSide
