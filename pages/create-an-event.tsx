import { ChangeEvent, useState } from 'react'
import InputNew from '../components/common/InputNew'
import CommonHead from '../components/Head'
import Loading from '../components/Loading'
import Nav from '../components/Nav'
import NavbarTop from '../components/NavbarTop'
import { IFormSchema } from '../interfaces/api/schema'
import { useForm, SubmitHandler } from 'react-hook-form'
import TextArea from '../components/common/TextArea'
import Upload from '../components/common/Upload'
import IconUpload from '../components/icons/IconUpload'
import InputDate from '../components/common/InputDate'
import IconPlace from '../components/icons/IconPlace'
import InputNumber from '../components/common/InputNumber'
import IconPhoto from '../components/icons/IconPhoto'
import { PaymentMethodData } from '../constants/form'
import Checkbox from '../components/common/Checkbox'
import Button from '../components/Button'
import ConfirmModal from '../components/ConfirmModal'
import { useNear } from '../contexts/near'
import { CloudinaryService } from '../services/Cloudinary'
import { utils } from 'near-api-js'

interface IPaymentMethodCheckbox {
	key: string
	title: string
	checked: boolean
}

const ConfirmModalContent = () => (
	<p className="flex items-center flex-wrap text-sm">
		Are you sure you want to create this event?
	</p>
)

const CreateAnEvent = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormSchema>()
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)
	const { wallet, generateAuthToken } = useNear()
	const [nftImageFile, setNftImageFile] = useState<File | undefined>(undefined)
	const [nftImageUrl, setNftImageUrl] = useState<string | undefined>(undefined)
	const [thumbnailImageFile, setThumbnailImageFile] = useState<
		File | undefined
	>(undefined)
	const [thumbnailImageUrl, setThumbnailImageUrl] = useState<
		string | undefined
	>(undefined)
	const [paymentMethodData, setPaymentMethodData] = useState<
		IPaymentMethodCheckbox[]
	>(
		PaymentMethodData.map((data) => ({
			...data,
			checked: false,
		}))
	)
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
	const { upload } = CloudinaryService()
	const isFulfillPaymentMethod = paymentMethodData.some((data) => data.checked)

	const onChangeThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
		const url = URL.createObjectURL(e.target?.files?.[0] as File)
		setThumbnailImageUrl(url)
		setThumbnailImageFile(e.target.files?.[0])
	}

	const onChangeNFTImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const url = URL.createObjectURL(e.target?.files?.[0] as File)
		setNftImageUrl(url)
		setNftImageFile(e.target.files?.[0])
	}

	const onChangePaymentMethod = (
		e: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const temp = [...paymentMethodData]
		temp[index].checked = e.target.checked
		setPaymentMethodData(temp)
	}

	const onSubmitForm = () => {
		setShowConfirmModal(true)
	}

	const onSubmitFormFinal: SubmitHandler<IFormSchema> = async (data) => {
		console.log(data)

		const checkSubaccountExist = async (subaccount?: string) => {
			const isSubAccountExist = wallet?.account().viewFunction({
				contractId: process.env.NEXT_PUBLIC_CONTRACT_NAME,
				methodName: 'is_subaccount_exist',
				args: { subaccount: subaccount },
			})

			return isSubAccountExist
		}

		setIsLoadingSubmit(true)

		if (await checkSubaccountExist(data.subaccount)) {
			console.log(`Subaccount ${data.subaccount} exist`)
			setIsLoadingSubmit(false)
			return
		}

		const authToken = await generateAuthToken?.()

		const formdataThumbnail = new FormData()
		formdataThumbnail.append('file', thumbnailImageFile as File)
		formdataThumbnail.append('upload_preset', 'event_am_ticket')
		const resThumbnailUrl = await upload(formdataThumbnail)

		const formdataNft = new FormData()
		formdataNft.append('file', nftImageFile as File)
		formdataNft.append('upload_preset', 'event_am_ticket')
		const resNftUrl = await upload(formdataNft)

		const res = await fetch('/api/events', {
			method: 'POST',
			headers: new Headers({
				Authorization: authToken,
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				title: data.title,
				organizer_name: data.organizer_name,
				description: data.description,
				thumbnail_image: resThumbnailUrl.secure_url,
				event_date: data.event_date,
				event_location: data.event_location,
				nft_image: resNftUrl.secure_url,
				subaccount: `${data.subaccount}.${process.env.NEXT_PUBLIC_CONTRACT_NAME}`,
				num_of_guests: data.num_of_guests,
				minting_price: data.minting_price,
				payment_method: paymentMethodData
					.filter((data) => data.checked)
					.map((data) => data.key),
			}),
		})

		const createTicketNFTContract = async () => {
			await wallet?.account().functionCall({
				contractId: process.env.NEXT_PUBLIC_CONTRACT_NAME as string,
				methodName: 'create',
				args: {
					subaccount: data.subaccount,
					metadata: {
						spec: 'nft-1.0.0',
						name: data.title,
						symbol: data.title,
					},
					token_metadata: {
						title: data.title,
						description: data.description,
						media: resNftUrl.url,
						copies: Number(data.num_of_guests),
					},
					minting_price: utils.format.parseNearAmount(
						data.minting_price?.toString()
					),
				},
				attachedDeposit: utils.format.parseNearAmount('4'),
				gas: 200000000000000,
			})
		}

		if (res.status === 200) await createTicketNFTContract()

		setIsLoadingSubmit(false)
	}

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<CommonHead title="Create an event" image={`/pipapo.jpeg`} />
			<Nav />
			<ConfirmModal
				isShow={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				onClick={handleSubmit(onSubmitFormFinal)}
				title={`Create Event Confirmation`}
				content={<ConfirmModalContent />}
				isLoading={isLoadingSubmit}
			/>
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="w-10/12 md:w-8/12 mx-auto my-6">
					<h1 className="font-bold text-3xl mb-4 md:mb-12">Create an event</h1>

					<div className="flex flex-col md:flex-row pb-6 border-b border-primary">
						<div className="w-full  md:w-6/12 inline-block items-center justify-center">
							<p className="font-semibold text-lg">Basic Info</p>
						</div>
						<div className="w-full  md:w-6/12 flex flex-col space-y-4">
							<InputNew
								{...register('title', {
									required: true,
								})}
								placeholder="Title event"
								isFullWidth
								isError={errors.title !== undefined}
								errorMessage="Title must be filled"
							/>
							<InputNew
								{...register('organizer_name', {
									required: true,
								})}
								placeholder="Organizer name"
								isFullWidth
								isError={errors.organizer_name !== undefined}
								errorMessage="Organizer name must be filled"
							/>
							<TextArea
								{...register('description')}
								placeholder="Description"
								isFullWidth
							/>
						</div>
					</div>

					<div className="mt-6 flex flex-col md:flex-row pb-6 border-b border-primary">
						<div className="w-6/12 inline-block items-center justify-center">
							<p className="font-semibold text-lg">Event Info</p>
						</div>
						<div className="w-full md:w-6/12 flex flex-col space-y-4">
							<InputDate {...register('event_date')} isFullWidth />
							<InputNew
								{...register('event_location')}
								preffixIcon={<IconPlace size={16} color="black" />}
								placeholder="Event location"
								isFullWidth
							/>
							<div>
								<div>
									<p className="font-semibold text-sm">
										<>Number of guests</>
									</p>
									<p className="text-contra-base-80 text-xs">
										total NFTs that will be minted
									</p>
								</div>
								<InputNumber
									{...register('num_of_guests', {
										required: `Number of guests must be filled`,
									})}
								/>
							</div>
							{/* {thumbnailImageUrl !== undefined && (
								<div className="rounded-lg max-h-40 aspect-square border-2 border-black relative">
									<img
										src={thumbnailImageUrl}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
							)} */}
							{thumbnailImageUrl !== undefined ? (
								<div className="rounded-lg max-h-44 w-full aspect-square border-2 border-black relative">
									<img
										src={thumbnailImageUrl}
										alt=""
										className="object-contain w-full h-full"
									/>
								</div>
							) : (
								<div className="rounded-lg w-full border-2 min-h-[100px] border-black bg-contra-color-yellow flex items-center justify-center">
									<IconPhoto size={40} color="black" />
								</div>
							)}
							<Upload
								{...register('thumbnail_image', {
									required: true,
									onChange: onChangeThumbnail,
								})}
								preffixIcon={<IconUpload size={16} color="black" />}
								label={'Upload Thumbnail'}
							/>
							{errors.thumbnail_image !== undefined && (
								<p className="text-red-500 text-xs">
									Thumbnail image must be filled
								</p>
							)}
						</div>
					</div>
					<div className="mt-6 flex flex-col md:flex-row">
						<div className="w-6/12 inline-block items-center justify-center">
							<p className="font-semibold text-lg">NFTs Ticket</p>
						</div>
						<div className="flex flex-col space-y-4">
							{nftImageUrl !== undefined ? (
								<div>
									<div className="rounded-xl max-h-64 aspect-square border-2 border-black relative">
										<img
											src={nftImageUrl}
											alt=""
											className="object-contain w-full h-full rounded-xl"
										/>
									</div>
								</div>
							) : (
								<div className="rounded-lg aspect-square border-2 border-black bg-contra-color-yellow flex items-center justify-center">
									<IconPhoto size={40} color="black" />
								</div>
							)}
							<Upload
								{...register('nft_image', {
									onChange: onChangeNFTImage,
									required: true,
								})}
								preffixIcon={<IconUpload size={16} color="black" />}
								label={'Upload NFT Image'}
							/>
							{errors.nft_image !== undefined && (
								<p className="text-red-500 text-xs">NFT image must be filled</p>
							)}
							<InputNew
								{...register('subaccount', {
									required: true,
								})}
								placeholder="Sub account"
								isFullWidth
								isError={errors.subaccount !== undefined}
								errorMessage="Subaccount must be filled"
							/>
							<div>
								<div>
									<p className="font-semibold text-sm">Price</p>
								</div>
								<InputNumber
									{...register('minting_price', {
										required: `Price must be filled and number`,
									})}
									isFullWidth
								/>
							</div>
							<div>
								<div>
									<p className="font-semibold text-sm mb-2">Payment Method</p>
								</div>
								<div className="space-y-2">
									{paymentMethodData.map((data, index) => {
										return (
											<Checkbox
												key={index}
												checked={data.checked}
												label={data.title}
												id={data.key}
												onChange={onChangePaymentMethod}
												index={index}
											/>
										)
									})}
								</div>
								{!isFulfillPaymentMethod && (
									<p className="text-xs text-red-500">
										You must choose minimum one payment method
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="flex w-full mt-8">
						<Button
							onClickHandler={handleSubmit(onSubmitForm)}
							color="primary"
							isFullWidth
						>
							Create
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateAnEvent
