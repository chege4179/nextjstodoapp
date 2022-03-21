/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		mongodburl: "Your Mongo DB credentials",
	}
}

module.exports = nextConfig
