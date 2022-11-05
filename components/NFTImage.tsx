import clsx from 'clsx'
import { useRouter } from 'next/router'
import { IMG_NFT_URL } from '../constants/url'

const NFTImage = ({
	size,
	image = IMG_NFT_URL,
}: {
	size: 'base' | 'large' | 'small'
	image?: string
}) => {
	const router = useRouter()
	return (
		<div
			className={clsx(
				`flex-shrink-0 relative rounded-xl shadow-lg cursor-pointer hover:transition-all hover:scale-105`,
				size === 'small' ? `w-[160px]` : ``,
				size === 'base' ? `w-[240px]` : ``,
				size === 'large' ? `w-[360px]` : ``
			)}
		>
			<img
				src={image}
				alt=""
				className="object-contain w-full h-full rounded-xl"
			/>
			<div className="flex items-center bg-base rounded-b-xl absolute bottom-0 inset-x-0 p-2 text-xs">
				<span className="font-semibold text-textDark mx-2">#NFT 1</span>
				{size === 'base' && (
					<span
						className="cursor-pointer text-textLight hover:text-opacity-50 transition"
						onClick={() => router.push(`/event/1`)}
					>
						View details
					</span>
				)}
			</div>
		</div>
	)
}

export default NFTImage
