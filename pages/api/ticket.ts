import { PendingTicketModel } from './../../db/models/pending_ticket_model'
import { FormModel } from '../../db/models/form_model'
import { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../db/utils/connect'
import { authSignature } from '../../contexts/near'

export default async function events(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongo

	if (req.method === 'GET') {
		try {
			const data = await PendingTicketModel.findOne({
				token_id: req.query.token_id,
				contract_id: req.query.contract_id,
			}).exec()
			if (!data) {
				res.status(404).json({
					status: 404,
				})
			} else {
				res.json({
					status: res.statusCode,
					data: data,
				})
			}
			res.end()
		} catch (err) {
			res.end
		}
	} else if (req.method === 'POST') {
		try {
			const accountId = await authSignature(req.headers.authorization)
			const body = JSON.parse(req.body)
			const docForm = await FormModel.findOne({
				subaccount: body.contract_id,
			}).exec()

			if (docForm.owner_id !== accountId) {
				throw new Error('Not owner')
			}

			const curDocPendingTicket = await PendingTicketModel.findOne({
				token_id: body.token_id,
				contract_id: body.contract_id,
			}).exec()

			if (curDocPendingTicket) {
				res.json({
					status: res.statusCode,
					message: `document already exist with status : ${curDocPendingTicket.status}`,
				})
				res.end()
			} else {
				const doc = new PendingTicketModel({
					token_id: body.token_id,
					contract_id: body.contract_id,
					issued_at: new Date(),
					status: 'open',
				})
				await doc.validateSync()
				await doc.save()
				res.json({
					status: res.statusCode,
					message: 'pending ticket created',
				})
				res.end()
			}
		} catch (error: any) {
			res.status(500).json({
				status: 0,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				message: error.message,
			})
			res.end()
		}
	} else if (req.method === 'PUT') {
		try {
			const accountId = await authSignature(req.headers.authorization)
			const body = JSON.parse(req.body)
			const docForm = await FormModel.findOne({
				subaccount: body.contract_id,
			}).exec()

			if (docForm.owner_id !== accountId) {
				throw new Error('Not owner')
			}

			await PendingTicketModel.findOneAndUpdate(
				{
					token_id: body.token_id,
					contract_id: body.contract_id,
				},
				{
					$set: {
						status: body.status,
					},
				}
			)
			res.json({
				status: res.statusCode,
				message: 'pending ticket updated',
			})
			res.end()
		} catch (error) {
			console.log(error)
			res.status(500).json({
				status: 0,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				message: error.message,
			})
			res.end()
		}
	}
}
