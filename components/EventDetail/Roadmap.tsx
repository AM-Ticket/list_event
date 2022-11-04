const Roadmap = () => {
	return (
		<div>
			<p className="font-extrabold text-2xl text-textDark mb-10">Rundown</p>
			<div className="grid grid-cols-4">
				{[...Array(4)].map(() => {
					return (
						<div className="relative border-t-2 border-black flex flex-col col-span-1 py-4">
							<div className="absolute -top-8 left-0">10.00 AM</div>
							<div className="absolute -top-2 left-0 w-4 h-4 border border-primary rounded-full bg-white" />
							<p className="font-semibold">Opening</p>
							<p className="text-xs line-clamp-2">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
								temporibus dignissimos culpa! Necessitatibus ex nostrum nulla
								illo. Unde quia facere cumque maiores. Quisquam consequatur
								vitae unde explicabo dignissimos et delectus.
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Roadmap
