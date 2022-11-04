import Button from '../../components/Button'
import NavbarTop from '../../components/NavbarTop'
import IconLike from '../../components/icons/IconLike'
import Nav from '../../components/Nav'
import NFTImage from '../../components/NFTImage'
import Overview from '../../components/EventDetail/Overview'
import Roadmap from '../../components/EventDetail/Roadmap'
import Location from '../../components/EventDetail/Location'

const EventDetail = () => {
	return (
		<div className="max-w-[2560px] w-full bg-base min-h-screen flex">
			<Nav />
			<div className="w-[320px] min-h-screen hidden lg:block" />
			<div className="flex flex-col flex-1 p-2 lg:p-6 pt-20">
				<NavbarTop />
				<div className="w-11/12 p-6">
					<div className="flex space-x-8 mb-8">
						<NFTImage size="large" />
						<Overview />
					</div>
					<div className="flex mb-8">
						<Roadmap />
					</div>
					<div className="flex mb-8">
						<Location />
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventDetail
