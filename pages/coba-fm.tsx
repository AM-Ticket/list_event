import React from 'react'
import { motion } from 'framer-motion'

const CobaFm = () => {
	return (
		<div className="max-w-3xl h-screen flex items-center justify-center bg-textLight">
			<motion.div
				className="bg-fuchsia-500 w-32 h-32"
				// initial={{ opacity: 0 }}
				animate={{
					scale: [1, 2, 2, 1, 1],
					rotate: [0, 0, 270, 270, 0],
					borderRadius: ['20%', '20%', '50%', '50%', '20%'],
				}}
				transition={{ duration: 5 }}
			/>
		</div>
	)
}

export default CobaFm
