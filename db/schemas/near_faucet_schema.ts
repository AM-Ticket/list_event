import { INearFaucetSchema } from '../../interfaces/api/schema'
import { Schema } from 'mongoose'

export const nearFaucetSchema = new Schema<INearFaucetSchema>({
	account_id: String,
	issued_at: Number,
})
