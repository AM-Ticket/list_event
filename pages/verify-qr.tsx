// @ts-nocheck
import Nav from '../components/Nav'
import NavbarTop from '../components/NavbarTop'
import { QrReader } from 'react-qr-reader'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useNear } from '../contexts/near'
import axios from 'axios'
import { useInterval } from '../hooks/useInterval'

const VerifyQR = () => {
	const [selected, setSelected] = useState('environment')
	const [scanData, setScanData] = useState('none')
	const [postedTicket, setPostedTicket] = useState(false)
	const [isRedeemed, setIsRedeemed] = useState(false)
	const { wallet, generateAuthToken } = useNear()
	const router = useRouter()

	const handleScan = async (scanData) => {
		if (scanData && scanData !== '') {
			setScanData(scanData.text)
			// setPrecScan(scanData);
			// await fetchData({ qr: scanData })
			router.replace(scanData.text)
		}
	}

	useEffect(() => {
		// organizer post pending ticket after scan
		if (router.query.token_id && router.query.contract_id && !postedTicket) {
			const postPendingTicket = async () => {
				setPostedTicket(true)
				const authToken = await generateAuthToken()
				await axios.post(
					'/api/ticket',
					{
						token_id: router.query.token_id,
						contract_id: router.query.contract_id,
					},
					{
						headers: {
							Authorization: authToken,
							'Content-type': 'application/json',
						},
					}
				)
			}
			postPendingTicket()
		}
	})

	useInterval(() => {
		if (postedTicket && !isRedeemed) {
			const checkNft = async () => {
				const token = await wallet?.account().viewFunction({
					contractId: router.query.contract_id,
					methodName: 'nft_token',
					args: {
						token_id: router.query.token_id,
					},
				})
				const redeemed =
					JSON.parse(token.metadata.extra).attributes.redeemed === 'true'
				if (redeemed === true) {
					setIsRedeemed(true)
					const authToken = await generateAuthToken()
					await axios.put(
						'/api/ticket',
						{
							token_id: router.query.token_id,
							contract_id: router.query.contract_id,
							status: 'redeemed',
						},
						{
							headers: {
								Authorization: authToken,
								'Content-type': 'application/json',
							},
						}
					)
				}
			}
			checkNft()
		}
	}, 1000)

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="p-10">
					<p className="font-extrabold text-3xl text-textDark mb-12"></p>
					{postedTicket ? (
						!isRedeemed ? (
							<p>Please wait for user's approval...</p>
						) : (
							<p>NFT has been redeemed</p>
						)
					) : (
						<div className="w-[600px]">
							{scanData.text}
							<QrReader
								facingMode={selected}
								delay={500}
								onResult={handleScan}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default VerifyQR
