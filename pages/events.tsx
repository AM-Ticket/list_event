import Nav from '../components/Nav'
import Filter from '../components/Events/Filter'
import NavbarTop from '../components/NavbarTop'
import EventItem from '../components/Events/EventItem/Base'
import useSWR from 'swr'
import { EventService } from '../services/Event'
import EventListLoader from '../components/Loader/EventListLoader'
import { GetServerSideProps } from 'next'

const events = () => {
	const filterData = [
		{
			id: 'all',
			title: 'All',
		},
		{
			id: 'newest',
			title: 'Newest',
		},
		{
			id: 'trend',
			title: 'Trend',
		},
	]
	const { getEvents } = EventService()
	const { data, isValidating } = useSWR(`events::all`, getEvents)
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<Filter filters={filterData} />
				<div className="flex flex-col space-y-6">
					{!data && isValidating ? (
						<EventListLoader />
					) : (
						data?.map((data, index) => {
							return <EventItem key={index} data={data} />
						})
					)}
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	console.log(query)
	if (query.transactionHashes) {
		delete query.transactionHashes
		res.writeHead(302, { Location: '/events' })
		res.end()
	}
	return { props: {} }
}

export default events
