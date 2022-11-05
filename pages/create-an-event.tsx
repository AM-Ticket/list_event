// @ts-nocheck
import Nav from '../components/Nav'
import NavbarTop from '../components/NavbarTop'
import Input from '../components/common/Input'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useState } from 'react'
import Button from '../components/Button'
import { useNear } from '../contexts/near'
import { CloudinaryService } from '../services/Cloudinary'
import Loading from '../components/Loading'
import NFTImage from '../components/NFTImage'

const createAnEvent = () => {
	const [title, setTitle] = useState(null)
	const [organizer, setOrganizer] = useState(null)
	const [description, setDescription] = useState(null)
	const [thumbnail, setThumbnail] = useState(null)
	const [date, setDate] = useState(new Date())
	const [location, setLocation] = useState(null)
	const [subAccountName, setSubAccountName] = useState(null)
	const [nftImage, setNftImage] = useState(null)
	const [nftCopies, setNftCopies] = useState(null)
	const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false)
	const [nftImageUrl, setNftImageUrl] = useState<string | undefined>(undefined)
	const [thumbnailImageUrl, setThumbnailImageUrl] = useState<
		string | undefined
	>(undefined)

	const { authToken, generateAuthToken } = useNear()
	const { upload } = CloudinaryService()

	const onChangeThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
		const url = URL.createObjectURL(e.target?.files?.[0] as File)
		setThumbnailImageUrl(url)
	}

	const onChangeNFTImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const url = URL.createObjectURL(e.target?.files?.[0] as File)
		setNftImageUrl(url)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		setIsLoadingSubmit(true)
		// upload
		await generateAuthToken()
		const formdataThumbnail = new FormData()
		formdataThumbnail.append('file', thumbnail)
		formdataThumbnail.append('upload_preset', 'event_am_ticket')
		const resThumbnailUrl = await upload(formdataThumbnail)

		const formdataNft = new FormData()
		formdataNft.append('file', nftImage)
		formdataNft.append('upload_preset', 'event_am_ticket')
		const resNftUrl = await upload(formdataNft)
		// const resThumbnailUrl = 'https://google.com'
		// const resNftUrl = 'https://google.com'

		const res = await fetch('/api/events', {
			method: 'POST',
			headers: new Headers({
				Authorization: authToken,
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({
				title: title,
				organizer_name: organizer,
				description: description,
				thumbnail_image: resThumbnailUrl.secure_url,
				event_date: date,
				event_location: location,
				nft_image: resNftUrl.secure_url,
				subaccount: subAccountName,
				num_of_guests: nftCopies,
			}),
		})
		setIsLoadingSubmit(false)
	}

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<Loading isShow={isLoadingSubmit} />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="flex w-6/12 space-y-6">
					<div className="rounded-xl shadow-xl bg-white p-4 flex">
						<div>
							<h1 className="font-bold text-2xl mb-8">Create an event</h1>
							<form className="w-full max-w-lg" onSubmit={handleSubmit}>
								<div className="flex flex-wrap mb-6">
									<Input
										title="Title"
										placeholder="NEAR Bali Meetup"
										required="true"
										onChangeHandler={(e) => setTitle(e.target.value)}
									/>
									<Input
										title="Organizer"
										placeholder="NEAR Indonesia"
										required="true"
										onChangeHandler={(e) => setOrganizer(e.target.value)}
									/>
									<Input
										title="Description"
										placeholder="The biggest meetup ever for NEAR Bali has come!"
										onChangeHandler={(e) => setDescription(e.target.value)}
										required="true"
										type="textarea"
									/>
									{thumbnailImageUrl !== undefined && (
										<div className="rounded-lg w-full max-h-40 aspect-square border-2 border-black relative mb-4">
											<img
												src={thumbnailImageUrl}
												alt=""
												className="object-contain w-full h-full"
											/>
										</div>
									)}
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
										Upload Thumbnail
									</label>
									<input
										className="mb-6 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
										onChange={(e) => {
											setThumbnail(e.target.files[0])
											onChangeThumbnail(e)
										}}
										required
										type="file"
									/>
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
										Event Date
									</label>
									<div className="appearance-none block w-11/12 bg-gray-200 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white">
										<DatePicker
											selected={date}
											onChange={(date: Date) => setDate(date)}
										/>
									</div>
									<Input
										title="Location"
										placeholder="Bali"
										type="input"
										required="true"
										onChangeHandler={(e) => setLocation(e.target.value)}
									/>
									<Input
										title="Subaccount name"
										placeholder="nearbalimeetup"
										type="input"
										required="true"
										onChangeHandler={(e) => setSubAccountName(e.target.value)}
									/>
									{nftImageUrl !== undefined && (
										<div className="w-full mb-4">
											<NFTImage size="small" image={nftImageUrl} />
										</div>
									)}
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
										Upload NFT Image
									</label>
									<input
										onChange={(e) => {
											setNftImage(e.target.files[0])
											onChangeNFTImage(e)
										}}
										className="mb-6 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
										type="file"
										required
									/>
									<Input
										className="w-1/2"
										title="Number of tickets"
										placeholder="100"
										type="input"
										required="true"
										inputType="number"
										onChangeHandler={(e) => setNftCopies(e.target.value)}
									/>
								</div>
								<div className="mx-auto my-auto">
									<Button color="primary" size="lg">
										Submit
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default createAnEvent
