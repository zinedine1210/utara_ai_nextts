/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        PUBLIC_API_URL: 'http://127.0.0.1:1899/v1',
        BASE_API_URL: 'http://localhost:3000/api',
        WHATSAPP_API_URL: 'https://wa.gnscenter.com'
    },
    reactStrictMode: false,
    compress: true,
    // eslint: {
    //     ignoreDuringBuilds: true
    // },
    trailingSlash: false,
    // typescript: {
    //     ignoreBuildErrors: true
    // },
    // experimental: {
    //     missingSuspenseWithCSRBailout: false,
    // },
    images: {
        // loader: 'custom',
        // loaderFile: './loader.js',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'merakiui.com',
                port: ''
            }
        ]
    }
};

export default nextConfig;
