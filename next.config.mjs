/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{hostname: 'placehold.co'},
			{hostname: 'orange-basic-bandicoot-201.mypinata.cloud'}
		],
	}
};

export default nextConfig;
