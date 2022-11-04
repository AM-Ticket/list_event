import { IFormSchema } from '../../interfaces/api/schema'
import { Schema } from 'mongoose'

export const formModelSchema = new Schema<IFormSchema>({
	title: {
		type: String,
		required: true,
	},
	organizer_name: {
		type: String,
		required: true,
	},
	description: String,
	thumbnail_image: String,
	event_date: Date,
	event_location: String,
	nft_image: String,
	num_of_guests: Number,
	subaccount: String,
})
