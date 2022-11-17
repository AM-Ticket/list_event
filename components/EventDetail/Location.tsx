// import GoogleMapReact from 'google-map-react'
import { IFormSchema } from '../../interfaces/api/schema'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import IconLocation from '../icons/IconLocation'
import IconPlace from '../icons/IconPlace'

const Location = ({ data }: { data: IFormSchema }) => {
	const [position, setPosition] = useState<
		{ long: string; lat: string } | undefined
	>(data.position)
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
		libraries: ['places'],
	})

	useEffect(() => {
		setPosition(data.position)
	}, [data])

	return (
		<div>
			<p className="font-extrabold text-2xl text-textDark mb-2">Location</p>
			<div className="flex space-x-4 w-full lg:w-6/12 py-2 mb-4">
				<div>
					<div className="rounded-xl p-2 md:p-4 bg-base flex items-center shadow-xl">
						<IconPlace size={25} color="#FF731C" />
					</div>
				</div>
				<div>
					<p className="text-textDark text-opacity-40 text-sm">
						{data?.event_location}
					</p>
				</div>
			</div>
			<div className="w-80 md:w-[680px] h-[280px] relative">
				{typeof window !== 'undefined' && window.google && (
					<GoogleMap
						center={{
							lat: Number(position?.lat) || -6.194174814768331,
							lng: Number(position?.long) || 106.73110683559781,
						}}
						zoom={15}
						mapContainerStyle={{ width: `100%`, height: `100%` }}
						onLoad={(map) => setMap(map)}
					>
						<>
							<Marker
								position={{
									lat: Number(position?.lat) || -6.194174814768331,
									lng: Number(position?.long) || 106.73110683559781,
								}}
							/>
						</>
					</GoogleMap>
				)}
				<div
					className="absolute bottom-8 left-5 p-2 cursor-pointer w-8 h-8 z-20 bg-white rounded-full flex items-center justify-center"
					onClick={() => {
						map?.panTo({
							lat: Number(position?.lat),
							lng: Number(position?.long),
						})
						map?.setZoom(15)
					}}
				>
					<IconLocation size={25} color="#333333" />
				</div>
			</div>
		</div>
	)
}

export default Location
