import axios from 'axios'

export const CloudinaryService = () => {
	const CloudinaryRequest = axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}/v1_1`,
	})

	const upload = async (data: FormData) => {
		const res = await CloudinaryRequest.post(
			`/${process.env.NEXT_PUBLIC_CLOUDNAME_CLOUDINARY}/image/upload`,
			data
		)
		return res.data
	}

	return {
		upload,
	}
}
