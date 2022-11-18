import IconDiscord from './icons/IconDiscord'
import IconTelegram from './icons/IconTelegram'
import IconTwitter from './icons/IconTwitter'
import IconX from './icons/IconX'
import Modal from './Modal'
import {
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
} from 'react-share'
import IconFacebook from './icons/IconFacebook'
import { IFormSchema } from '../interfaces/api/schema'

interface ShareModalProps {
	isShow: boolean
	tokenId?: string
	contractId?: string
	onClose: () => void
	data?: IFormSchema
}

const ShareModal = (props: ShareModalProps) => {
	return (
		<Modal isShow={props.isShow} onClose={props.onClose}>
			<div className="w-[600px] mx-auto rounded-xl bg-base p-12 relative flex flex-col items-center">
				<div
					className="absolute top-5 right-5 cursor-pointer"
					onClick={props.onClose}
				>
					<IconX size={20} color="#393939" />
				</div>
				<p className="font-extrabold text-2xl text-textDark mb-10">
					Share your Event
				</p>
				<div className="w-full grid grid-cols-12 gap-4">
					<div className="col-span-6 lg:col-span-4 py-4 border-2 cursor-pointer hover:scale-105 transition border-black rounded-xl flex flex-col items-center space-y-2">
						<TwitterShareButton
							title={`Checkout ${props.data?.title} event from ${props.data?.organizer_name} only on @pipapo_io\n\n#pipapoio #NFTEvent #NFTTicketing`}
							url={`${process.env.NEXT_PUBLIC_API_URL}/event/${props.data?.title}`}
						>
							<IconTwitter size={30} color="#FF731C" className="mx-auto" />
							<p className="font-semibold">Twitter</p>
						</TwitterShareButton>
					</div>
					<div className="col-span-6 lg:col-span-4 py-4 border-2 cursor-pointer hover:scale-105 transition border-black rounded-xl flex flex-col items-center space-y-2">
						<FacebookShareButton
							title={`Checkout ${props.data?.title} event from ${props.data?.organizer_name} only on @pipapo_io\n\n#pipapoio #NFTEvent #NFTTicketing`}
							url={`${process.env.NEXT_PUBLIC_API_URL}/event/${props.data?.title}`}
						>
							<IconFacebook size={30} color="#FF731C" className="mx-auto" />
							<p className="font-semibold">Facebook</p>
						</FacebookShareButton>
					</div>
					<div className="col-span-6 lg:col-span-4 py-4 border-2 cursor-pointer hover:scale-105 transition border-black rounded-xl flex flex-col items-center space-y-2">
						<TelegramShareButton
							title={`Checkout ${props.data?.title} event from ${props.data?.organizer_name} only on @pipapo_io\n\n#pipapoio #NFTEvent #NFTTicketing`}
							url={`${process.env.NEXT_PUBLIC_API_URL}/event/${props.data?.title}`}
						>
							<IconTelegram size={30} color="#FF731C" className="mx-auto" />
							<p className="font-semibold">Telegram</p>
						</TelegramShareButton>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default ShareModal
