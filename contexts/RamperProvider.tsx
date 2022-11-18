import { createContext, useContext, useEffect, useState } from 'react'
import {
	init,
	AUTH_PROVIDER,
	THEME,
	signIn,
	getUser,
	signOut,
	User,
	signMessage,
	sendTransaction,
} from '@ramper/near'
import getConfig from '../constants/near-config'
import SignMessageRamperModal from '../components/SignMessageRamperModal'
import {
	SignAndSendTransactionsRamperProps,
	TViewFunction,
} from '../interfaces/wallet'
import { providers } from 'near-api-js'
import { getActiveWallet, setActiveWallet } from '../db/utils/common'
import { TicketService } from '../services/Ticket'
import Toast from '../components/Toast'

interface RamperProviderContextValue {
	signInRamper: Function | undefined
	signOutRamper: Function | undefined
	userRamper: User | null
	generateAuthTokenRamper: Function | undefined
	signAndSendTransactions: ({
		receiverId,
		actions,
	}: SignAndSendTransactionsRamperProps) => Promise<void>
	viewFunction: TViewFunction
}

interface RamperProviderProps {
	children: React.ReactNode
}

const RamperContext = createContext<RamperProviderContextValue | null>(null)

export const RamperProvider = (props: RamperProviderProps) => {
	const [userRamper, setUserRamper] = useState<User | null>(null)
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [isHasRamperSignMsg, setIsHasRamperSignMsg] = useState(false)
	const [showSignedModal, setShowSignedModal] = useState(false)
	const { postNearFaucet } = TicketService()
	const [alreadyFundError, setAlreadyFundError] = useState(false)

	const nearConfig = getConfig(process.env.NEXT_PUBLIC_NODE_ENV)

	const initRamper = async () => {
		init({
			appName: 'Near Test App',
			authProviders: [
				AUTH_PROVIDER.GOOGLE,
				AUTH_PROVIDER.FACEBOOK,
				AUTH_PROVIDER.TWITTER,
				AUTH_PROVIDER.APPLE,
				AUTH_PROVIDER.EMAIL,
			],
			walletProviders: [],
			network: nearConfig.networkId,
			theme: THEME.LIGHT,
			appId: `towucpkedr`,
		})
		if (getActiveWallet() === 'ramper') {
			setUserRamper(getUser())
			if (localStorage.getItem('RAMPER_SIGNED_MSG')) {
				generateAuthToken()
			} else {
				setShowSignedModal(true)
			}
		}
	}

	const signInUserRamper = async () => {
		await signIn()
		setActiveWallet('ramper')
		setUserRamper(getUser())
		setIsSignedIn(true)
	}

	const signOutUserRamper = () => {
		signOut()
	}

	const generateAuthToken = async () => {
		const accountId = getUser()?.wallets.near.publicKey
		const signedMsgLocalStorage = JSON.parse(
			localStorage.getItem('RAMPER_SIGNED_MSG') as string
		)
		if (signedMsgLocalStorage && signedMsgLocalStorage.user === accountId) {
			const signedMsg = signedMsgLocalStorage.signedMsg
			signedMsg.publicKey.data = new Uint8Array(
				Object.values(signedMsg.publicKey.data)
			)
			signedMsg.signature = new Uint8Array(Object.values(signedMsg.signature))
			const pubKey = Buffer.from(signedMsg.publicKey.data).toString('hex')
			const signature = Buffer.from(signedMsg.signature).toString('hex')
			const payload = [accountId, pubKey, signature]
			const _authToken = Buffer.from(payload.join('&')).toString('base64')
			return _authToken
		}
	}

	const signAndSendTransactionRamper = async ({
		receiverId,
		actions,
	}: SignAndSendTransactionsRamperProps) => {
		let transactionActions
		//for single transaction
		if (actions && actions.length > 0) {
			transactionActions = actions?.map((action) => ({
				receiverId: receiverId || process.env.NEXT_PUBLIC_CONTRACT_NAME,
				actions: [action],
			}))
		}
		const res = await sendTransaction({
			transactionActions: transactionActions,
		})
	}

	const viewFunction: TViewFunction = async ({
		receiverId,
		methodName,
		args = '',
	}) => {
		return new providers.JsonRpcProvider({ url: nearConfig.nodeUrl })
			.query({
				request_type: 'call_function',
				account_id: receiverId,
				method_name: methodName,
				args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
				finality: 'optimistic',
			})
			.then((res) =>
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				JSON.parse(Buffer.from(res.result).toString())
			)
	}

	useEffect(() => {
		initRamper()
	}, [])

	useEffect(() => {
		if (isSignedIn) initRamper()
	}, [isSignedIn])

	useEffect(() => {
		async function postNearFaucetFunc() {
			try {
				await postNearFaucet({
					account_id: userRamper?.wallets.near.publicKey,
				})
			} catch (error: any) {
				if (error.response.data.message === 'already got fund') {
					setAlreadyFundError(true)
					setTimeout(() => {
						setAlreadyFundError(false)
					}, 2000)
				}
			}
		}
		if (isHasRamperSignMsg) {
			initRamper()
			postNearFaucetFunc()
		}
	}, [isHasRamperSignMsg])

	return (
		<RamperContext.Provider
			value={{
				signInRamper: signInUserRamper,
				signOutRamper: signOutUserRamper,
				userRamper,
				generateAuthTokenRamper: generateAuthToken,
				signAndSendTransactions: signAndSendTransactionRamper,
				viewFunction,
			}}
		>
			<>
				<Toast
					type={`error`}
					show={alreadyFundError}
					text="Account id already fund"
				/>
				<SignMessageRamperModal
					isShow={
						showSignedModal &&
						typeof window !== 'undefined' &&
						!localStorage.getItem('RAMPER_SIGNED_MSG')
					}
					onClick={async () => {
						if (!userRamper) return
						const arr = []
						for (
							let i = 0;
							i < userRamper?.wallets.near.publicKey.length;
							i++
						) {
							arr[i] = userRamper.wallets.near.publicKey.charCodeAt(i)
						}
						const msgBuf = new Uint8Array(arr)
						const nearConfig = getConfig(process.env.NEXT_PUBLIC_NODE_ENV)
						const signedMsg = (
							await signMessage({
								message: msgBuf,
								network: nearConfig.networkId,
							})
						).result
						const signedMsgString = JSON.stringify({
							user: userRamper.wallets.near.publicKey,
							signedMsg,
						})
						localStorage.setItem('RAMPER_SIGNED_MSG', signedMsgString)
						setIsHasRamperSignMsg(true)
					}}
				/>
				{props.children}
			</>
		</RamperContext.Provider>
	)
}

export function useRamperProvider() {
	const context = useContext(RamperContext)

	if (!context) {
		throw new Error('useRamperProvider must be used within a RamperProvider')
	}

	return context
}
