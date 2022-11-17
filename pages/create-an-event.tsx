import { ChangeEvent, useEffect, useState } from 'react'
import InputNew from '../components/common/InputNew'
import CommonHead from '../components/Head'
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
import { transactions, utils } from 'near-api-js'
import { GetServerSideProps } from 'next'
import { getEvents } from '../services/SSR'
import { useRouter } from 'next/router'
import IconPlus from '../components/icons/IconPlus'
import IconX from '../components/icons/IconX'
import { useRamperProvider } from '../contexts/RamperProvider'
import { BN } from 'bn.js'
import Toast from '../components/Toast'
import IconNear from '../components/icons/IconNear'
import GoogleMapReact from 'google-map-react'
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	Autocomplete,
} from '@react-google-maps/api'

interface IPaymentMethodCheckbox {
	key: string
	title: string
	checked: boolean
}

interface IPosition {
	long: number
	lat: number
}

const ConfirmModalContent = () => (
	<p className="flex items-center flex-wrap text-sm">
		Are you sure you want to create this event?
	</p>
)

const CreateAnEvent = ({ events }: { events: IFormSchema[] }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormSchema>()
	const router = useRouter()
	const {
		viewFunction,
		userRamper,
		signAndSendTransactions,
		generateAuthTokenRamper,
	} = useRamperProvider()
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)
	const { wallet, generateAuthToken } = useNear()
	const accountId =
		wallet?.account().accountId || userRamper?.wallets.near.publicKey || 'none'
	const [nftImageFile, setNftImageFile] = useState<File | undefined>(undefined)
	const [nftImageUrl, setNftImageUrl] = useState<string | undefined>(undefined)
	const [royaltyValue, setRoyaltyValue] = useState(0)
	const [showSubaccountExistToast, setShowSubaccountExistToast] =
		useState(false)
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
	const [position, setPosition] = useState<IPosition | undefined>({
		lat: -6.220556015459309,
		long: 106.79381606219681,
	})
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [autoCompleteObj, setAutoCompleteObj] = useState()
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
		libraries: ['places'],
	})
	const [formattedAddress, setFormattedAddress] = useState('')
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
	const [gallery, setGallery] = useState<string[]>([...Array(6)].map(() => ''))
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

	const onChangeGallery = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const url = URL.createObjectURL(e.target?.files?.[0] as File)
		const temp = [...gallery]
		temp[index] = url
		setGallery(temp)
	}

	const onDeleteGallery = (index: number) => {
		const temp = [...gallery]
		temp[index] = ''
		setGallery(temp)
	}

	const onSubmitForm = () => {
		setShowConfirmModal(true)
	}

	const onSubmitFormFinal: SubmitHandler<IFormSchema> = async (data) => {
		const checkSubaccountExist = async (subaccount?: string) => {
			const isSubAccountExist =
				localStorage.getItem('ACTIVE_WALLET') === 'near-wallet'
					? wallet?.account().viewFunction({
							contractId: process.env.NEXT_PUBLIC_CONTRACT_NAME,
							methodName: 'is_subaccount_exist',
							args: { subaccount: subaccount },
					  })
					: viewFunction({
							receiverId: process.env.NEXT_PUBLIC_CONTRACT_NAME as string,
							methodName: 'is_subaccount_exist',
							args: { subaccount: subaccount },
					  })

			return isSubAccountExist
		}

		setIsLoadingSubmit(true)

		if (await checkSubaccountExist(data.subaccount)) {
			setIsLoadingSubmit(false)
			setShowConfirmModal(false)
			setShowSubaccountExistToast(true)
			setTimeout(() => {
				setShowSubaccountExistToast(false)
			}, 2000)
			return
		}

		const authToken =
			localStorage.getItem('ACTIVE_WALLET') === 'near-wallet'
				? await generateAuthToken?.()
				: await generateAuthTokenRamper?.()

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
				event_location: formattedAddress || data.event_location,
				nft_image: resNftUrl.secure_url,
				subaccount: `${data.subaccount}.${process.env.NEXT_PUBLIC_CONTRACT_NAME}`,
				num_of_guests: data.num_of_guests,
				minting_price: data.minting_price,
				payment_method: paymentMethodData
					.filter((data) => data.checked)
					.map((data) => data.key),
				gallery_images: gallery.every((data) => !data)
					? []
					: gallery.filter((data) => data),
				position: JSON.stringify(position),
			}),
		})

		const createTicketNFTContract = async () => {
			localStorage.getItem('ACTIVE_WALLET') === 'near-wallet'
				? await wallet?.account().functionCall({
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
							perpetual_royalties: { [accountId]: royaltyValue * 100 },
						},
						attachedDeposit: new BN(
							utils.format.parseNearAmount('4') as string
						),
						gas: new BN(200000000000000),
				  })
				: await signAndSendTransactions({
						receiverId: process.env.NEXT_PUBLIC_CONTRACT_NAME as string,
						actions: [
							transactions.functionCall(
								'create',
								{
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
									perpetual_royalties: { [accountId]: royaltyValue * 100 },
								},
								new BN(200000000000000),
								new BN(utils.format.parseNearAmount('4') as string)
							),
						],
				  })
		}

		if (res.status === 200) await createTicketNFTContract()

		setIsLoadingSubmit(false)
	}

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<CommonHead title="Create an event" image={`/pipapo.jpeg`} />
			<Nav />
			<Toast
				type={`error`}
				show={showSubaccountExistToast}
				text="Sub account is already exist"
			/>
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
					<h1 className="font-bold text-xl mb-4">Your recently event</h1>
					<div className="border-b border-dashed pb-3 flex space-x-4 overflow-x-auto mb-8">
						{events
							.filter(
								(data) =>
									data.owner_id ===
									(wallet?.getAccountId() || userRamper?.wallets.near.publicKey)
							)
							.map((data, index) => {
								return (
									<div
										key={index}
										className="flex items-center justify-center w-28 md:w-36 lg:w-52 h-full flex-shrink-0"
									>
										<div className="flex flex-wrap w-28 md:w-36 lg:w-52 h-full rounded-xl shadow-xl p-2">
											<img
												src={data.nft_image}
												className="w-full aspect-square rounded-xl mb-2"
											/>
											<div className="flex flex-col justify-between w-full">
												<div>
													<p className="font-extrabold text-sm text-textDark mb-2 line-clamp-2 h-16">
														{data.title}
													</p>
													<p
														className="text-sm text-textDark hover:text-opacity-60 cursor-pointer transition"
														onClick={() => router.push(`/event/${data.title}`)}
													>
														View Details
													</p>
												</div>
											</div>
										</div>
									</div>
								)
							})}
					</div>
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
							{typeof window !== 'undefined' && window.google && (
								<Autocomplete
									// @ts-ignore
									onLoad={(autoComplete) => setAutoCompleteObj(autoComplete)}
									onPlaceChanged={() => {
										// @ts-ignore
										const place = autoCompleteObj?.getPlace()
										if (place.geometry) {
											map?.panTo({
												lat: Number(place.geometry.location.lat()),
												lng: Number(place.geometry.location.lng()),
											})
											map?.setZoom(15)
											setPosition({
												lat: place.geometry.location.lat(),
												long: place.geometry.location.lng(),
											})
											setFormattedAddress(place.formatted_address)
										} else setFormattedAddress(place.name)
									}}
								>
									<InputNew
										{...register('event_location')}
										preffixIcon={<IconPlace size={16} color="black" />}
										placeholder="Event location"
										isFullWidth
									/>
								</Autocomplete>
							)}
							<div className="w-full h-[280px]">
								{typeof window !== 'undefined' && window.google && (
									<GoogleMap
										center={{
											lat: Number(position?.lat) || -6.220556015459309,
											lng: Number(position?.long) || 106.79381606219681,
										}}
										zoom={12}
										mapContainerStyle={{ width: `100%`, height: `100%` }}
										onLoad={(map) => setMap(map)}
									>
										<>
											<Marker
												position={{
													lat: Number(position?.lat) || -6.220556015459309,
													lng: Number(position?.long) || 106.79381606219681,
												}}
											/>
										</>
									</GoogleMap>
								)}
							</div>
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
							<div>
								<div>
									<p className="font-semibold text-sm">Sub account</p>
								</div>
								<InputNew
									{...register('subaccount', {
										required: true,
										pattern: /^[-_a-zA-Z0-9]+$/,
									})}
									placeholder="Sub account"
									isFullWidth
									isError={errors.subaccount !== undefined}
									errorMessage={
										errors.subaccount?.type === 'pattern'
											? `Only allows A-z, 1-9, -, and _ characters`
											: `Subaccount must be filled`
									}
								/>
							</div>
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
									<p className="font-semibold text-sm">Royalty %</p>
								</div>
								<InputNumber
									value={royaltyValue}
									{...register('royalty', {
										required: `royalty is required`,
										onChange: (event) =>
											setRoyaltyValue(Math.min(event.target.value, 90)),
									})}
									isFullWidth
									preffixIcon={<IconNear size={16} color="black" />}
								/>
							</div>
							{/*
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
							*/}
							<div>
								<p className="font-semibold text-sm mb-2">Gallery Images</p>
								<div className="w-full border rounded-xl border-black p-4 grid grid-cols-2 md:grid-cols-3 gap-2">
									{gallery.map((doc, idx) => (
										<div className="relative">
											<label
												key={idx}
												className="relative cursor-pointer border-2 w-28 aspect-square border-black border-dashed rounded-xl flex items-center justify-center"
											>
												{doc ? (
													<>
														<img
															src={doc}
															className="object-contain w-full h-full rounded-xl"
															alt=""
														/>
													</>
												) : (
													<>
														<IconPlus size={20} color="#393939" />
													</>
												)}
												<input
													type="file"
													className="hidden"
													onChange={(e) => onChangeGallery(e, idx)}
												/>
											</label>
											{doc && (
												<div
													onClick={(e) => {
														e.stopPropagation()
														onDeleteGallery(idx)
													}}
													className="cursor-pointer z-40 flex items-center justify-center w-7 h-7 rounded-full bg-textDark hover:bg-opacity-60 absolute -top-2 -right-2"
												>
													<IconX size={14} color="white" />
												</div>
											)}
										</div>
									))}
								</div>
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

export const getServerSideProps: GetServerSideProps = async () => {
	const events = await getEvents()
	return {
		props: {
			events,
		},
	}
}

export default CreateAnEvent
