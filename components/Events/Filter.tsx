import clsx from 'clsx'
import { useState } from 'react'
import { IFilter } from '../../interfaces/Filter'
// import { TFilterEvents } from '../../types/filter'

interface FilterProps {
	filters: IFilter[]
}

const Filter = (props: FilterProps) => {
	const [active, setActive] = useState<string>('all')
	return (
		<div className="px-5 mb-6 flex items-center space-x-4">
			{props.filters.map((filter, index) => {
				return (
					<button
						key={index}
						className={clsx(
							`rounded-xl py-2 px-5 hover:bg-opacity-300 transition text-sm font-semibold`,
							active === filter.id
								? `bg-primary text-white`
								: `bg-white text-textLight`
						)}
						onClick={() => {
							setActive(filter.id)
						}}
					>
						{filter.title}
					</button>
				)
			})}
		</div>
	)
}

export default Filter
