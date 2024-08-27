/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PUBLIC_API_URL: 'http://127.0.0.1:1899/v1',
        BASE_API_URL: 'http://localhost:3000/api'
    }
};

export default nextConfig;
