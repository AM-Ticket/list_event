import { FormModel } from '../../db/models/form_model'
import connectMongo from '../../db/utils/connect'
import { NextApiRequest, NextApiResponse } from 'next'
import { authSignature } from '../../contexts/near'
import { EPaymentMethod } from '../../interfaces/api/schema'

export default async function events(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongo

	if (req.method === 'GET') {
		try {
			let data
			if (req.query.search) {
				const search = req.query.search
				data = await FormModel.find({
					$or: [
						{ title: new RegExp(search as string, 'i') },
						{ organizer_name: new RegExp(search as string, 'i') },
					],
				})
					.sort({ _id: -1 })
					.exec()
			} else {
				data = await FormModel.find().sort({ _id: -1 })
			}
			res.json({
				status: res.statusCode,
				data: data,
			})
			res.end()
		} catch (err) {
			res.end
		}
	} else if (req.method === 'POST') {
		try {
			const validatedPaymentMethod = req.body.payment_method.filter(
				(data: string) =>
					data.includes(EPaymentMethod['bank_transfer']) ||
					data.includes(EPaymentMethod['credit_card']) ||
					data.includes(EPaymentMethod['paypal'])
			)
			const accountId = await authSignature(req.headers.authorization)
			const doc = new FormModel({
				title: req.body.title,
				organizer_name: req.body.organizer_name,
				description: req.body.description,
				thumbnail_image: req.body.thumbnail_image,
				event_date: req.body.event_date,
				event_location: req.body.event_location,
				nft_image: req.body.nft_image,
				num_of_guests: req.body.num_of_guests,
				subaccount: req.body.subaccount,
				minting_price: req.body.minting_price,
				owner_id: accountId,
				payment_method: validatedPaymentMethod,
				gallery_images: req.body.gallery_images,
				position: JSON.parse(`${req.body.position}`),
			})
			await doc.validateSync()
			await doc.save()
			res.json({
				status: res.statusCode,
				message: 'form have created',
			})
			res.end()
		} catch (error) {
			res.status(500).json({
				status: 0,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				message: error._message,
			})
			res.end()
		}
	}
}
