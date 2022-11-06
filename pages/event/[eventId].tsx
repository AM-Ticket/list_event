import NavbarTop from '../../components/NavbarTop'
import Nav from '../../components/Nav'
import NFTImage from '../../components/NFTImage'
import Overview from '../../components/EventDetail/Overview'
import Location from '../../components/EventDetail/Location'
import { EventService } from '../../services/Event'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Breadcrumb from '../../components/Breadcrumb'

const EventDetail = () => {
	const router = useRouter()
	const breadCrumbData = [{ path: `/events`, label: `Event List` }]
	const { getEvents } = EventService()
	const { data } = useSWR(`events::all`, getEvents)
	const eventData = data?.filter(
		(data) => data.title === router.query.eventId
	)[0]
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="w-11/12 p-2 md:p-6">
					<div className="mb-6">
						<Breadcrumb data={breadCrumbData} />
					</div>
					<div className="flex flex-wrap space-y-8 md:space-y-0 space-x-2 md:space-x-8 mb-8">
						<div className="w-full md:w-4/12">
							<NFTImage
								size="small"
								data={eventData}
								image={eventData?.nft_image}
							/>
						</div>
						<div className="w-full md:w-7/12">
							<Overview data={eventData} />
						</div>
					</div>
					{/* <div className="flex mb-8">
						<Roadmap />
					</div> */}
					<div className="flex mb-8 w-full">
						<Location />
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventDetail
