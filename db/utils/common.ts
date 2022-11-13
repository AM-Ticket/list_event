export const prettyTruncate = (str = '', len = 8, type?: string) => {
	if (str && str.length > len) {
		if (type === 'address') {
			const front = Math.ceil(len / 2)
			const back = str.length - (len - front)
			return `${str.slice(0, front)}...${str.slice(back)}`
		}
		return `${str.slice(0, len)}...`
	}
	return str
}

export const getActiveWallet = () => {
	return localStorage.getItem('ACTIVE_WALLET')
}

export const setActiveWallet = (wallet: string) => {
	return localStorage.setItem('ACTIVE_WALLET', wallet)
}

export const removeActiveWallet = () => {
	return localStorage.removeItem('ACTIVE_WALLET')
}
