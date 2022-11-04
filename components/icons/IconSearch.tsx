import React from 'react'
import { IconProps } from '../../interfaces/IconProps'

const IconSearch = (props: IconProps) => {
	return (
		<svg
			width={props.size}
			height={props.size}
			viewBox="0 0 26 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
		>
			<path
				d="M23.0953 21.6963L16.5014 15.1023C17.5246 13.7795 18.0781 12.1621 18.0781 10.4609C18.0781 8.42461 17.2834 6.51523 15.8463 5.07559C14.4092 3.63594 12.4947 2.84375 10.4609 2.84375C8.42715 2.84375 6.5127 3.63848 5.07559 5.07559C3.63594 6.5127 2.84375 8.42461 2.84375 10.4609C2.84375 12.4947 3.63848 14.4092 5.07559 15.8463C6.5127 17.2859 8.42461 18.0781 10.4609 18.0781C12.1621 18.0781 13.777 17.5246 15.0998 16.5039L21.6938 23.0953C21.7131 23.1147 21.736 23.13 21.7613 23.1405C21.7866 23.1509 21.8137 23.1563 21.841 23.1563C21.8684 23.1563 21.8955 23.1509 21.9207 23.1405C21.946 23.13 21.9689 23.1147 21.9883 23.0953L23.0953 21.9908C23.1147 21.9715 23.13 21.9485 23.1405 21.9233C23.1509 21.898 23.1563 21.8709 23.1563 21.8436C23.1563 21.8162 23.1509 21.7891 23.1405 21.7639C23.13 21.7386 23.1147 21.7156 23.0953 21.6963ZM14.4828 14.4828C13.4063 15.5568 11.9793 16.1484 10.4609 16.1484C8.94258 16.1484 7.51563 15.5568 6.43906 14.4828C5.36504 13.4063 4.77344 11.9793 4.77344 10.4609C4.77344 8.94258 5.36504 7.51309 6.43906 6.43906C7.51563 5.36504 8.94258 4.77344 10.4609 4.77344C11.9793 4.77344 13.4088 5.3625 14.4828 6.43906C15.5568 7.51563 16.1484 8.94258 16.1484 10.4609C16.1484 11.9793 15.5568 13.4088 14.4828 14.4828Z"
				fill={props.color}
			/>
		</svg>
	)
}

export default IconSearch
