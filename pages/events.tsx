import Nav from '../components/Nav'
import Filter from '../components/Events/Filter'
import Top from '../components/Events/Top'
import EventItem from '../components/Events/EventItem'

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
				<Top />
				<Filter filters={filterData} />
				<EventItem />
			</div>
		</div>
	)
}

export default events
