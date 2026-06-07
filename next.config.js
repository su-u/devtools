/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint エラーでも本番ビルドを失敗させない（lint は `npm run lint` で明示的に実行する）
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;