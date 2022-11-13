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
import useSWRImmutable from 'swr/immutable'
import { IFormSchema } from '../interfaces/api/schema'

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
	// const { getEvents } = EventService()
	const [data, setData] = useState<IFormSchema[] | undefined>([])
	const [isRendering, setIsRendering] = useState<boolean>(true)
	const [searchQuery, setSearchQuery] = useState('')
	const [enterSearchQuery, setEnterSearchQuery] = useState(0)
	const { getEvents: getEventsSWR } = EventService()

	const onEnterSearch = () => setEnterSearchQuery((prev) => prev + 1)

	const { data: _data, isValidating } = useSWR(
		!isRendering && enterSearchQuery === 0 && `event::all`,
		async () => await getEventsSWR(),
		{
			onSuccess: (data) => {
				setData(data)
			},
		}
	)

	const { data: __data, isValidating: isValidatingSearch } = useSWR(
		!isRendering && enterSearchQuery !== 0
			? `event_search::${searchQuery}`
			: null,
		async (key: string) => {
			const searchquery = key.split('::')[1]
			return await getEventsSWR({ search: searchquery })
		},
		{
			onSuccess: (data) => {
				setData(data)
			},
		}
	)

	useEffect(() => {
		setTimeout(() => {
			setIsRendering(false)
		}, 2000)
	}, [isRendering])

	if (isRendering) {
		return <SplashLoader isLoading={isRendering} />
	}

	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<CommonHead image={`/pipapo.jpeg`} />
			<Nav setSearchData={setSearchQuery} onKeyPress={onEnterSearch} />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop setSearchData={setSearchQuery} onKeyPress={onEnterSearch} />
				<Filter filters={filterData} />
				<div className="flex flex-col space-y-6">
					{!data && (isValidating || isValidatingSearch) ? (
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
