import axios from 'axios'
import { useNear } from '../contexts/near'
import { IFormSchema } from '../interfaces/api/schema'
import { INFT } from '../interfaces/nft'

export const EventService = () => {
	const baseReq = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
	})
	const { wallet } = useNear()

	const getEvents = async () => {
		const res = await baseReq.get<{ data: IFormSchema[] }>(`${process.env.NEXT_PUBLIC_API_URL}/api/events`)
		return res.data.data
	}

	const getIsOwnedEventTicketByUser = async ({
		contractEvent,
		account_id,
	}: {
		contractEvent: string
		account_id: string
	}) => {
		const supply = await wallet?.account().viewFunction({
			contractId: contractEvent,
			methodName: 'nft_supply_for_owner',
			args: {
				account_id,
			},
		})
		return supply
	}

	const getEventTicketsByUser = async ({contractEvent, skip, account_id}:{
		contractEvent: string,
		skip: number,
		account_id: string
	}
	) => {
		const supply: INFT[] = await wallet?.account().viewFunction({
			contractId: contractEvent,
			methodName: `nft_tokens_for_owner`,
			args: {
				account_id,
				from_index: skip.toString(),
				limit: 10,
			},
		})
		return supply
	}

	return {
		getEvents,
		getIsOwnedEventTicketByUser,
		getEventTicketsByUser,
	}
}
