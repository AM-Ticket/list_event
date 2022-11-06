import GoogleMapReact from 'google-map-react'

const Location = () => {
	return (
		<div>
			<p className="font-extrabold text-2xl text-textDark mb-4">Location</p>
			<div className="w-80 md:w-[680px] h-[280px] relative">
				<GoogleMapReact
					defaultCenter={{
						lat: 10.99835602,
						lng: 77.01502627,
					}}
					defaultZoom={10}
					bootstrapURLKeys={{ key: '' }}
				>
					<div>yues</div>
				</GoogleMapReact>
			</div>
		</div>
	)
}

export default Location
