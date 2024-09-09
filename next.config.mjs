/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
    env: {
        // BASE_DOMAIN: 'https://utara-ai.vercel.app',
        BASE_DOMAIN: 'http://localhost:3000',
        PUBLIC_API_URL: 'https://gai.co.id/gai-ai-service/v1',
        WHATSAPP_API_URL: 'https://wa.gnscenter.com',
        SERVER: 'production'
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
    //     reactCompiler: true
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

const withPWA = withPWAInit({
  dest: "public",
  disable: nextConfig.env.SERVER === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
});



export default withPWA(nextConfig);

