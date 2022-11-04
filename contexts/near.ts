// @ts-nocheck
import { useEffect, useState } from 'react'
import * as nearAPI from 'near-api-js'
import getConfig from '../constants/near-config'

const nearConfig = getConfig(process.env.NEXT_PUBLIC_NODE_ENV)

export function useNear() {
	const [near, setNear] = useState<nearAPI.Near>()
	const [wallet, setWallet] = useState<nearAPI.WalletConnection>()
	const [signIn, setSignIn] = useState<Function>()

	useEffect(() => {
		const near = new nearAPI.Near({
			...nearConfig,
			keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
		})
		const wallet = new nearAPI.WalletConnection(near, null)
		function signIn() {
			wallet.requestSignIn({ contractId: nearConfig.contractName })
		}
		setNear(near)
		setWallet(wallet)
		setSignIn(() => signIn)
	}, [])

	return { near, wallet, signIn }
}
