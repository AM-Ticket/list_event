import NavbarTop from '../../components/NavbarTop'
import Nav from '../../components/Nav'
import NFTImage from '../../components/NFTImage'
import Overview from '../../components/EventDetail/Overview'
import Location from '../../components/EventDetail/Location'
import Breadcrumb from '../../components/Breadcrumb'
import CommonHead from '../../components/Head'
import { GetServerSideProps } from 'next'
import { getEvents } from '../../services/SSR'
import { IFormSchema } from '../../interfaces/api/schema'

const EventDetail = ({
	events,
	eventId,
}: {
	events: IFormSchema[]
	eventId: string
}) => {
	const breadCrumbData = [{ path: `/events`, label: `Event List` }]

	const eventData = events.filter((data) => data.title === eventId)[0]
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<CommonHead title={eventData.title} image={`/pipapo.jpeg`} />
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="w-full lg:w-11/12 p-2 md:p-6">
					<div className="mb-6">
						<Breadcrumb data={breadCrumbData} />
					</div>
					<div className="flex flex-wrap space-y-8 md:space-y-0 space-x-2 md:space-x-8 mb-8">
						<div className="w-full md:w-4/12">
							<NFTImage data={eventData} image={eventData?.nft_image} />
						</div>
						<div className="w-full md:w-7/12">
							<Overview data={eventData} />
						</div>
					</div>
					{/* <div className="flex mb-8">
						<Roadmap />
					</div> */}
					<div className="flex mb-8 w-full">
						<Location data={eventData} />
					</div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	if (query.transactionHashes) {
		delete query.transactionHashes
		res.writeHead(302, { Location: '/events' })
		res.end()
	}
	const events = await getEvents()
	return {
		props: {
			events,
			eventId: query.eventId,
		},
	}
}

export default EventDetail
