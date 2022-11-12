import '../styles/globals.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}
