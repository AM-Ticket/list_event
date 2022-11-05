import axios from "axios"
import { IFormSchema } from "../interfaces/api/schema"

export const EventService = ()=>{
  const baseReq = axios.create({
    baseURL: process.env.API_URL,
  })

  const getEvents = async()=>{
    const res = await baseReq.get<{data: IFormSchema[]}>(`/api/events`)
    return res.data.data
  }

  return {
    getEvents
  }
}