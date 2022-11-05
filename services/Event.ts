import axios from "axios"
import { useNear } from "../contexts/near"
import { IFormSchema } from "../interfaces/api/schema"

export const EventService = ()=>{
  const baseReq = axios.create({
    baseURL: process.env.API_URL,
  })
  const { wallet } = useNear()

  const getEvents = async()=>{
    const res = await baseReq.get<{data: IFormSchema[]}>(`/api/events`)
    return res.data.data
  }

  const getIsOwnedEventTicketByUser = async ({contractEvent, account_id}:{contractEvent: string, account_id:string})=>{
    const supply = await wallet?.account().viewFunction({
      contractId: contractEvent,
      methodName: 'nft_supply_for_owner',
      args: {
        account_id,
      },
    })
    return supply
  } 

  return {
    getEvents,
    getIsOwnedEventTicketByUser
  }
}