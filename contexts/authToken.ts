import { User } from '@ramper/near'
import { WalletConnection } from 'near-api-js'
import { createContext, useEffect, useState } from 'react'
import { TWalletType } from '../interfaces/wallet'
import { useNear } from './near'
import { useRamperProvider } from './RamperProvider'

interface WalletProviderProps {
	type: TWalletType
}

export const useAuthToken = (props: WalletProviderProps) => {
	const { generateAuthTokenRamper } = useRamperProvider()
	const { generateAuthToken } = useNear()
	const [generateAuthTokenWallet, setGenerateAuthTokenWallet] =
		useState<Function>()

	useEffect(() => {
		if (localStorage.getItem('ACTIVE_WALLET') === 'near-wallet') {
			setGenerateAuthTokenWallet(() => generateAuthToken)
		} else {
			setGenerateAuthTokenWallet(() => generateAuthTokenRamper)
		}
	}, [])

	return { generateAuthTokenWallet }
}
