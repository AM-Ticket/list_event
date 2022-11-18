import '../styles/globals.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { RamperProvider } from '../contexts/RamperProvider'
import axios from 'axios'
import useBaseStore from '../stores/baseStore'
import { useNear } from '../contexts/near'
import {
	getActiveWallet,
	removeActiveWallet,
	setActiveWallet,
} from '../db/utils/common'

export default function App({ Component, pageProps }: AppProps) {
	const { setNearUsdPrice } = useBaseStore()
	const { wallet } = useNear()

	useEffect(() => {
		const getNearUsdPrice = async () => {
			try {
				const nearUsdPrice = await axios.get<{ near: { usd: number } }>(
					'https://api.coingecko.com/api/v3/simple/price?ids=NEAR&vs_currencies=USD'
				)
				const price = nearUsdPrice.data.near.usd
				setNearUsdPrice(price)
			} catch (error) {
				console.log(error)
				return null
			}
		}
		getNearUsdPrice()
		if (wallet?.isSignedIn()) setActiveWallet('near-wallet')
		else if (getActiveWallet() === 'near-wallet') removeActiveWallet()
	}, [wallet])

	return (
		<>
			<RamperProvider>
				<Component {...pageProps} />
			</RamperProvider>
		</>
	)
}
