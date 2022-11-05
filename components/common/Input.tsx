// @ts-nocheck
export default function Input({
	className = '',
	title,
	placeholder,
	type = 'input',
	onChangeHandler,
	required = 'false',
	inputType = null,
	value = null,
	step = null,
}) {
	let extraAttributes = {}
	if (required === 'true')
		extraAttributes = { required: true, ...extraAttributes }
	if (inputType) extraAttributes = { type: inputType, ...extraAttributes }
	if (value) extraAttributes = { value: value, ...extraAttributes }
	if (step) extraAttributes = { step, ...extraAttributes }
	return (
		<div className={`w-full -mx-3 px-3 mb-6 md:mb-0 ${className}`}>
			<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
				{title}
			</label>
			{type == 'textarea' ? (
				<textarea
					className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					onChange={onChangeHandler}
					placeholder={placeholder}
					{...extraAttributes}
				></textarea>
			) : (
				<input
					className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					id="grid-first-name"
					type="text"
					onChange={onChangeHandler}
					placeholder={placeholder}
					{...extraAttributes}
				/>
			)}
		</div>
	)
}
