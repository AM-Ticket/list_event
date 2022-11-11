import axios from 'axios'
import { IFormSchema } from '../interfaces/api/schema'

const SSRService = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const getEvents = async () => {
	const res = await SSRService.get<{ data: IFormSchema[] }>(`/api/events`)
	return res.data.data
}
