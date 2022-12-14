// @ts-nocheck
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import NavbarTop from '../components/NavbarTop'
import TicketModal from '../components/TicketModal'
import { useNear } from '../contexts/near'
import { useRamperProvider } from '../contexts/RamperProvider'
import { getActiveWallet } from '../db/utils/common'

const MyTickets = () => {
	const [eventList, setEventList] = useState(null)
	const [ownedTicketList, setOwnedTicketList] = useState(null)
	const { wallet } = useNear()
	const { userRamper, viewFunction } = useRamperProvider()
	const accountId = wallet?.getAccountId() || userRamper?.wallets.near.publicKey

	useEffect(() => {
		const fetchEvents = async () => {
			const events = await axios.get('/api/events')
			setEventList(events.data.data)
		}

		fetchEvents().catch(console.error)
	}, [])

	useEffect(() => {
		const account_id = accountId
		if (eventList && eventList.length > 0) {
			const contracts = eventList
				.filter((event) => event.subaccount)
				.map((event) => {
					return event.subaccount
				})

			let nftsOwned = []
			contracts.map(async (contract) => {
				let nftsOwnedPerContract = []
				const supply =
					getActiveWallet() === 'near-wallet'
						? await wallet?.account().viewFunction({
								contractId: contract,
								methodName: 'nft_supply_for_owner',
								args: {
									account_id,
								},
						  })
						: await viewFunction({
								receiverId: contract,
								methodName: 'nft_supply_for_owner',
								args: { account_id },
						  })
				let nftsResult = [0]
				let i = 0
				while (nftsOwnedPerContract.length < supply) {
					nftsResult =
						getActiveWallet() === 'near-wallet'
							? await wallet?.account().viewFunction({
									contractId: contract,
									methodName: 'nft_tokens_for_owner',
									args: {
										account_id,
										from_index: i.toString(),
										limit: 10,
									},
							  })
							: await viewFunction({
									receiverId: contract,
									methodName: 'nft_tokens_for_owner',
									args: { account_id, from_index: i.toString(), limit: 10 },
							  })
					i += 10
					nftsOwnedPerContract = [...nftsResult, ...nftsOwnedPerContract]
				}
				nftsOwned = { [contract]: nftsOwnedPerContract, ...nftsOwned }
				setOwnedTicketList(nftsOwned)
			})
		}
	}, [eventList])

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="p-2 md:p-10">
					<p className="font-extrabold text-3xl text-textDark mb-12">
						My Tickets
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
						{ownedTicketList &&
							Object.keys(ownedTicketList).map((contractId) => {
								return ownedTicketList[contractId].map((nft) => {
									const isRedeemed =
										JSON.parse(nft.metadata.extra).attributes?.redeemed ===
											'true' ||
										JSON.parse(nft.metadata.extra).attributes[0]?.value ===
											'true'
									return (
										<TicketModal
											data={{ ...nft, subaccount: contractId }}
											tokenId={nft.token_id}
											contractId={contractId}
											redeemed={isRedeemed}
											url={`${process.env.NEXT_PUBLIC_API_URL}/verify-qr?token_id=${nft.token_id}&contract_id=${contractId}`}
										>
											{nft.metadata.title}
										</TicketModal>
									)
								})
							})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyTickets
