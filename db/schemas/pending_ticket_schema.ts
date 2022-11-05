import { IPendingTicketSchema } from '../../interfaces/api/schema'
import { Schema } from 'mongoose'

export const pendingTicketSchema = new Schema<IPendingTicketSchema>({
	token_id: String,
	contract_id: String,
	issued_at: Date,
	status: String,
})
