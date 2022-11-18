import { NearFaucetModal } from './../../db/models/near_faucet_model'
import connectMongo from '../../db/utils/connect'
import { NextApiRequest, NextApiResponse } from 'next'
import * as naj from 'near-api-js'
import getConfig from '../../constants/near-config'
import BN from 'bn.js'

const nearConfig = getConfig(process.env.NEXT_PUBLIC_NODE_ENV)

const keyStore = new naj.keyStores.InMemoryKeyStore()
const near = new naj.Near({
	...nearConfig,
	keyStore: keyStore,
})

const keyPair = naj.KeyPair.fromString(process.env.FAUCET_PRIVATE_KEY as string)

export default async function nearFaucet(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongo

	await keyStore.setKey(
		nearConfig.networkId,
		process.env.FAUCET_ACCOUNT_ID as string,
		keyPair
	)

	const faucetAccount = await near.account(
		process.env.FAUCET_ACCOUNT_ID as string
	)

	if (req.method === 'POST') {
		try {
			const accountId = req.body.account_id
			const account = await NearFaucetModal.findOne({
				account_id: accountId,
			}).exec()

			if (account) {
				throw new Error('already got fund')
			}

			await faucetAccount.sendMoney(
				accountId,
				new BN('500000000000000000000000')
			)

			await NearFaucetModal.findOneAndUpdate(
				{ account_id: accountId },
				{
					$set: {
						account_id: accountId,
						issued_at: new Date().getTime(),
					},
				},
				{
					upsert: true,
				}
			)

			res.json({
				status: res.statusCode,
				message: 'Fund sent',
			})
			res.end()
		} catch (error) {
			console.log(error)
			res.status(500).json({
				status: 0,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				message: error,
			})
			res.end()
		}
	}
}
