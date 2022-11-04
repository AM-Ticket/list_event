import Nav from '../components/Nav'
import Filter from '../components/Events/Filter'
import NavbarTop from '../components/NavbarTop'
import EventItem from '../components/Events/EventItem/Base'

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
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<Filter filters={filterData} />
				<div className="flex flex-col space-y-6">
					<EventItem />
					<EventItem />
					<EventItem />
					<EventItem />
					<EventItem />
				</div>
			</div>
		</div>
	)
}

export default events
