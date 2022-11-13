import '../styles/globals.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useNear } from '../contexts/near'
import SignMessageRamperModal from '../components/SignMessageRamperModal'
import getConfig from '../constants/near-config'
import { signMessage } from '@ramper/near'
import { RamperProvider } from '../contexts/RamperProvider'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<RamperProvider>
				<Component {...pageProps} />
			</RamperProvider>
		</>
	)
}
