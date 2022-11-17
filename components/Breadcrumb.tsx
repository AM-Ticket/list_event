import Link from 'next/link'
import IconLeft from './icons/IconLeft'

const Breadcrumb = ({ data }: { data: { path: string; label: string }[] }) => {
	return (
		<div className="rounded-xl bg-white py-2 px-3 flex items-center space-x-2 w-max shadow-xl">
			{data.map((datum, index) => (
				<div key={index} className="flex items-center space-x-1">
					<IconLeft size={16} color="#393939" />
					<Link
						href={datum.path}
						className="text-xs md:text-sm font-semibold text-textDark hover:text-opacity-60"
					>
						<p>{datum.label}</p>
					</Link>
				</div>
			))}
		</div>
	)
}

export default Breadcrumb
