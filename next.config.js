/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/',
	// 			destination: '/events',
	// 			permanent: true,
	// 		},
	// 	]
	// },
}

module.exports = nextConfig
