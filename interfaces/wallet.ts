import { Transaction } from 'near-api-js/lib/providers/provider'
import { Action } from 'near-api-js/lib/transaction'

export type TWalletType = 'near-wallet' | 'ramper'

export interface SignAndSendTransactionsRamperProps {
	receiverId?: string
	actions?: Action[]
	transactions?: Transaction[]
}

export type TViewFunction = <T>(params: {
	receiverId: string
	methodName: string
	args: unknown
}) => Promise<T>
