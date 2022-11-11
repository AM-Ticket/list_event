export interface IFormSchema {
	title: string
	organizer_name: string
	description?: string
	thumbnail_image?: string
	event_date?: string
	event_location?: string
	nft_image?: string
	num_of_guests?: string
	subaccount?: string
	minting_price?: number
	owner_id?: string
	payment_method: string[]
}

export interface IPendingTicketSchema {
	token_id: string
	contract_id: string
	issued_at: string
	status: 'open' | 'redeemed'
}

export enum EPaymentMethod {
	bank_transfer = 'bank_transfer',
	paypal = 'paypal',
	credit_card = 'credit_card',
}
