import Button from '../../components/Button'
import NavbarTop from '../../components/NavbarTop'
import IconLike from '../../components/icons/IconLike'
import Nav from '../../components/Nav'
import NFTImage from '../../components/NFTImage'
import Overview from '../../components/EventDetail/Overview'
import Roadmap from '../../components/EventDetail/Roadmap'
import Location from '../../components/EventDetail/Location'
import { EventService } from '../../services/Event'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useNear } from '../../contexts/near'

const EventDetail = () => {
	const router = useRouter()
	const { wallet } = useNear()
	const { getEvents, getIsOwnedEventTicketByUser } = EventService()
	const { data } = useSWR(`events::all`, getEvents)
	const eventData = data?.filter(
		(data) => data.title === router.query.eventId
	)[0]

	const { data: nftData } = useSWR(
		eventData && wallet?.getAccountId()
			? {
					contractEvent: eventData.subaccount,
					account_id: wallet?.getAccountId(),
			  }
			: null,
		getIsOwnedEventTicketByUser
	)
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="w-11/12 p-6">
					<div className="flex space-x-8 mb-8">
						<NFTImage
							size="large"
							data={eventData}
							image={eventData?.nft_image}
						/>
						<Overview data={eventData} nftData={nftData} />
					</div>
					{/* <div className="flex mb-8">
						<Roadmap />
					</div> */}
					<div className="flex mb-8">
						<Location />
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventDetail
