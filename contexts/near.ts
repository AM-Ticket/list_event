// @ts-nocheck
import { useEffect, useState } from 'react'
import * as nearAPI from 'near-api-js'
import { Base64 } from 'js-base64'
import getConfig from '../constants/near-config'
import bs58 from 'bs58'
import sha256 from 'js-sha256'
import axios from 'axios'
import nacl from 'tweetnacl'

const nearConfig = getConfig(process.env.NEXT_PUBLIC_NODE_ENV)

export function useNear() {
	const [near, setNear] = useState<nearAPI.Near>()
	const [wallet, setWallet] = useState<nearAPI.WalletConnection>()
	const [signIn, setSignIn] = useState<Function>()
	const [generateAuthToken, setGenerateAuthToken] = useState<Function>()
	const [authToken, setAuthToken] = useState<String>()

	useEffect(() => {
		const near = new nearAPI.Near({
			...nearConfig,
			keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
		})
		const wallet = new nearAPI.WalletConnection(near, null)
		function signIn() {
			wallet.requestSignIn({ contractId: nearConfig.contractName })
			localStorage.setItem('ACTIVE_WALLET', 'near-wallet')
		}

		async function generateAuthToken() {
			const accountId = wallet.getAccountId()
			const signer = new nearAPI.InMemorySigner(wallet._keyStore)
			const arr = new Array(accountId)
			for (var i = 0; i < accountId.length; i++) {
				arr[i] = accountId.charCodeAt(i)
			}
			const msgBuf = new Uint8Array(arr)
			const signedMsg = await signer.signMessage(
				msgBuf,
				wallet._authData.accountId,
				wallet._networkId
			)
			const pubKey = Buffer.from(signedMsg.publicKey.data).toString('hex')
			const signature = Buffer.from(signedMsg.signature).toString('hex')
			const payload = [accountId, pubKey, signature]
			const authToken = Base64.encode(payload.join('&'))
			setAuthToken(authToken)
			return authToken
		}

		setNear(near)
		setWallet(wallet)
		setSignIn(() => signIn)
		setGenerateAuthToken(() => generateAuthToken)
	}, [])

	return { near, wallet, signIn, authToken, generateAuthToken }
}

const _hexToArr = (str) => {
	return new Uint8Array(str.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
}

export async function authSignature(authHeader) {
	try {
		const decodeAuthHeader = Base64.decode(authHeader)
		const [userId, pubKey, signature] = decodeAuthHeader.split('&')
		const pubKeyArr = _hexToArr(pubKey)
		const signatureArr = _hexToArr(signature)
		const hash = new Uint8Array(sha256.sha256.array(userId))
		const verify = nacl.sign.detached.verify(hash, signatureArr, pubKeyArr)
		if (!verify) {
			throw new Error('unauthorized')
		}
		const b58pubKey = bs58.encode(Buffer.from(pubKey.toUpperCase(), 'hex'))
		const response = await axios.post(nearConfig.nodeUrl, {
			jsonrpc: '2.0',
			id: 'dontcare',
			method: 'query',
			params: {
				request_type: 'view_access_key',
				finality: 'final',
				account_id: userId,
				public_key: `ed25519:${b58pubKey}`,
			},
		})

		if (
			response.data.result &&
			response.data.result.error &&
			pubKey !== userId
		) {
			throw new Error('unauthorized')
		}
		return userId
	} catch (err) {
		console.error(err)
		throw new Error(err)
	}
}
