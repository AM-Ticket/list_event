import { Fragment } from 'react'
import ContentLoader from 'react-content-loader'

const LargeEventListLoaderItem = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={750}
			height={330}
			viewBox="0 0 750 330"
			backgroundColor="#f3f3f3"
			foregroundColor="#e6e6e6"
			{...props}
		>
			<rect x="24" y="8" rx="3" ry="3" width="730" height="310" />
		</ContentLoader>
	)
}

const SmallEventListLoaderItem = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={365}
			height={660}
			viewBox="0 0 365 660"
			backgroundColor="#f3f3f3"
			foregroundColor="#e6e6e6"
			{...props}
		>
			<rect x="24" y="8" rx="3" ry="3" width="360" height="655" />
		</ContentLoader>
	)
}

const EventListLoader = () => {
	return (
		<>
			<div className="hidden lg:block">
				{[...Array(3)].map((_, index) => (
					<Fragment key={index}>
						<LargeEventListLoaderItem />
					</Fragment>
				))}
			</div>
			<div className="block lg:hidden">
				{[...Array(3)].map((_, index) => (
					<Fragment key={index}>
						<SmallEventListLoaderItem />
					</Fragment>
				))}
			</div>
		</>
	)
}

export default EventListLoader
