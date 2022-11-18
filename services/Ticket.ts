import axios from 'axios'
import { ITicket } from '../interfaces/ticket'

export const TicketService = () => {
	const baseReq = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL as string,
	})

	const postNearFaucet = async ({ account_id }: { account_id?: string }) => {
		const res = await baseReq.post<{ status: number; message: string }>(
			`/api/near-faucet`,
			{ account_id }
		)
		return res.data
	}

	const getTicketData = async ({
		token_id,
		contract_id,
	}: {
		token_id: string
		contract_id: string
	}) => {
		const res = await baseReq.get<{ data: ITicket }>(`/api/ticket`, {
			params: {
				token_id,
				contract_id,
			},
		})
		return res.data.data
	}

	return {
		postNearFaucet,
		getTicketData,
	}
}
