import { nearFaucetSchema } from '../schemas/near_faucet_schema'
import { INearFaucetSchema } from '../../interfaces/api/schema'
import { model, models } from 'mongoose'

export const NearFaucetModal =
	models.near_faucet ||
	model<INearFaucetSchema>('near_faucet', nearFaucetSchema)
