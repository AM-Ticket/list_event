import Nav from '../components/Nav'
import Filter from '../components/Events/Filter'
import NavbarTop from '../components/NavbarTop'
import EventItem from '../components/Events/EventItem/Base'
import useSWR from 'swr'
import { EventService } from '../services/Event'
import EventListLoader from '../components/Loader/EventListLoader'
import { GetServerSideProps } from 'next'
import CommonHead from '../components/Head'
import { useEffect, useState } from 'react'
import SplashLoader from '../components/SplashLoader'
import axios from 'axios'

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
	// const { data, isValidating } = useSWR(`events::all`, getEvents)
	const [data, setData] = useState([])
	const [isRendering, setIsRendering] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setIsRendering(false)
		}, 2000)
	}, [])

	useEffect(() => {
		setIsLoading(true)
		async function fetcher() {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/api/events`
			)
			setData(res.data.data)
		}
		if (!isRendering) fetcher()
		setIsLoading(false)
	}, [isRendering])

	if (isRendering) {
		return <SplashLoader isLoading={isRendering} />
	}

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<CommonHead image={`/pipapo.jpeg`} />
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<Filter filters={filterData} />
				<div className="flex flex-col space-y-6">
					{isLoading ? (
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
	if (query.transactionHashes) {
		delete query.transactionHashes
		res.writeHead(302, { Location: '/events' })
		res.end()
	}
	return { props: {} }
}

export default events
