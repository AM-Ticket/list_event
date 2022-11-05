import { pendingTicketSchema } from '../schemas/pending_ticket_schema'
import { IPendingTicketSchema } from '../../interfaces/api/schema'
import { model, models } from 'mongoose'

export const PendingTicketModel =
	models.pending_ticket ||
	model<IPendingTicketSchema>('pending_ticket', pendingTicketSchema)
