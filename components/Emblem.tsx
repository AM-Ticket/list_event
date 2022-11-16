const Emblem = ({ content }: { content: string }) => {
	return (
		<div className="bg-primary text-white rounded-full px-3 fireText text-xs">
			{content}
		</div>
	)
}

export default Emblem
