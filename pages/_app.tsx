import '../styles/globals.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { RamperProvider } from '../contexts/RamperProvider'
import axios from 'axios'
import useBaseStore from '../stores/baseStore'

export default function App({ Component, pageProps }: AppProps) {
	const { setNearUsdPrice } = useBaseStore()

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
	}, [])
	return (
		<>
			<RamperProvider>
				<Component {...pageProps} />
			</RamperProvider>
		</>
	)
}
