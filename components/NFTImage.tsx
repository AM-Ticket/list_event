import clsx from 'clsx'
import { useRouter } from 'next/router'
import { IMG_NFT_URL } from '../constants/url'
import { prettyTruncate } from '../db/utils/common'
import { IFormSchema } from '../interfaces/api/schema'

const NFTImage = ({
	viewDetail = false,
	image = IMG_NFT_URL,
	data,
	title,
}: {
	viewDetail?: boolean
	image?: string
	data?: IFormSchema
	title?: string
}) => {
	const router = useRouter()
	return (
		<div
			className={clsx(
				`flex-shrink-0 relative rounded-xl shadow-lg cursor-pointer hover:transition-all hover:scale-105 z-0 w-full bg-white`
			)}
		>
			<img
				src={image}
				alt=""
				className="object-contain w-full aspect-square rounded-xl"
			/>
			<div className="flex items-center bg-base rounded-b-xl absolute bottom-0 inset-x-0 p-2 text-xs">
				<span className="font-semibold text-textDark mx-2">
					{prettyTruncate(title || data?.title, 10, 'address')}
				</span>
				{viewDetail && data && (
					<span
						className="cursor-pointer text-textLight hover:text-opacity-50 transition"
						onClick={() => router.push(`/event/${title || data?.title}`)}
					>
						View details
					</span>
				)}
			</div>
		</div>
	)
}

export default NFTImage
