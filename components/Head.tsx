import Head from 'next/head'
import { IMG_PIPAPO_URL } from '../constants/url'

interface HeadProps {
	title?: string
	description?: string
	image?: string
	url?: string
	keywords?: string
}

const DEFAULT_TITLE = 'Pipapo - Your NFT Ticketing Platform'

const CommonHead = ({
	title = DEFAULT_TITLE,
	description = 'Buy, Own, Redeem your NFT Ticket',
	image = IMG_PIPAPO_URL,
	url = 'https://pipapo.io',
	keywords = 'ticket, nft, qrcode',
}: HeadProps) => {
	const _title = title ? `${title} - Pipapo` : DEFAULT_TITLE
	return (
		<Head>
			<title>{_title}</title>
			<meta name="title" content={_title} />
			<meta name="description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={_title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta name="keywords" content={keywords} />
			<meta name="robots" content="index, follow" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={_title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={image} />
		</Head>
	)
}

export default CommonHead
