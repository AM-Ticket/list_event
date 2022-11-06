import { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

const EventListLoaderItem = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={800}
			height={160}
			viewBox="0 0 800 160"
			backgroundColor="#f3f3f3"
			foregroundColor="#e6e6e6"
			{...props}
		>
			<rect x="24" y="8" rx="3" ry="3" width="640" height="200" />
		</ContentLoader>
	)
}

const EventListLoader = () => {
	return (
		<>
			{[...Array(3)].map((_, index) => (
				<Fragment key={index}>
					<EventListLoaderItem />
				</Fragment>
			))}
		</>
	)
}

export default EventListLoader
