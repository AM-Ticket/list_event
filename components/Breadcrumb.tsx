import Link from 'next/link'
import IconLeft from './icons/IconLeft'

const Breadcrumb = ({ data }: { data: { path: string; label: string }[] }) => {
	return (
		<div className="rounded-xl bg-white p-2 md:p-4 flex items-center space-x-2 w-max">
			{data.map((datum) => (
				<div className="flex items-center space-x-1">
					<IconLeft size={16} color="#393939" />
					<a>
						<Link
							href={datum.path}
							className="text-xs md:text-sm font-semibold text-textDark hover:text-opacity-60"
						>
							{datum.label}
						</Link>
					</a>
				</div>
			))}
		</div>
	)
}

export default Breadcrumb
