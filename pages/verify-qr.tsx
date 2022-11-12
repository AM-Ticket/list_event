// @ts-nocheck
import Nav from '../components/Nav'
import NavbarTop from '../components/NavbarTop'
import { QrReader } from 'react-qr-reader'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useNear } from '../contexts/near'
import axios from 'axios'
import { useInterval } from '../hooks/useInterval'
import Toast from '../components/Toast'
import Loading from '../components/Loading'

const VerifyQR = () => {
	const [selected, setSelected] = useState('environment')
	const [scanData, setScanData] = useState('none')
	const [postedTicket, setPostedTicket] = useState(false)
	const [isRedeemed, setIsRedeemed] = useState(false)
	const { wallet, generateAuthToken } = useNear()
	const router = useRouter()
	const [tokenId, setTokenId] = useState()
	const [contractId, setContractId] = useState()
	const [notownerError, setNotOwnerError] = useState(false)

	const handleScan = async (scanData) => {
		if (scanData && scanData !== '') {
			setScanData(scanData.text)
			// setPrecScan(scanData);
			// await fetchData({ qr: scanData })

			setTokenId(new URL(scanData.text).searchParams.get('token_id'))
			setContractId(new URL(scanData.text).searchParams.get('contract_id'))

			// router.replace(scanData.text)
		}
	}

	useEffect(() => {
		// organizer post pending ticket after scan
		// if (router.query.token_id && router.query.contract_id && !postedTicket) {
		if (tokenId && contractId && !postedTicket) {
			const postPendingTicket = async () => {
				const authToken = await generateAuthToken()
				try {
					await axios.post(
						'/api/ticket',
						{
							token_id: tokenId,
							contract_id: contractId,
						},
						{
							headers: {
								Authorization: authToken,
								'Content-type': 'application/json',
							},
						}
					)
					setPostedTicket(true)
				} catch (error) {
					if (error.response.data.message === 'Not owner') {
						setNotOwnerError(true)
						setTimeout(() => {
							setNotOwnerError(false)
						}, 3000)
					}
				}
			}
			postPendingTicket()
		}
	}, [tokenId, contractId])

	useInterval(() => {
		if (postedTicket && !isRedeemed) {
			const checkNft = async () => {
				const token = await wallet?.account().viewFunction({
					contractId: contractId,
					methodName: 'nft_token',
					args: {
						token_id: tokenId,
					},
				})
				const redeemed =
					JSON.parse(token?.metadata.extra).attributes.redeemed === 'true'
				if (redeemed === true) {
					const authToken = await generateAuthToken()
					await axios.put(
						'/api/ticket',
						{
							token_id: tokenId,
							contract_id: contractId,
							status: 'redeemed',
						},
						{
							headers: {
								Authorization: authToken,
								'Content-type': 'application/json',
							},
						}
					)
					setPostedTicket(false)
					setIsRedeemed(true)
					setTimeout(() => {
						setIsRedeemed(false)
					}, 2000)
				}
			}
			checkNft()
		}
	}, 1000)

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<Toast
				type={`error`}
				show={notownerError}
				text="Scanner is not event owner"
			/>
			<Toast type={`success`} show={isRedeemed} text="NFT has been redeemed" />
			<Loading
				isShow={postedTicket}
				text={`Please wait for user's approval...`}
			/>
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="p-4 flex flex-col items-center border-2 border-black rounded-xl">
					{/* <p className="font-extrabold text-3xl text-textDark mb-12"></p> */}
					{/* {postedTicket ? (
						!isRedeemed ? (
							<p>Please wait for user's approval...</p>
						) : (
							<p>NFT has been redeemed</p>
						)
					) : ( */}
					<p className="text-xs text-white mb-2 text-center bg-textDark p-3 rounded-xl">
						1. Scanning only allow on Desktop, mobile screen is not compatible{' '}
						<br />
						2. You must be the owner of the QR code to be scanned
					</p>
					<div className="w-8/12">
						{scanData.text}
						<QrReader facingMode={selected} delay={500} onResult={handleScan} />
					</div>
					{/* )} */}
				</div>
			</div>
		</div>
	)
}

export default VerifyQR
