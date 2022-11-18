import axios from 'axios'

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

	return {
		postNearFaucet,
	}
}
