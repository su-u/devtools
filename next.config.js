/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint エラーでも本番ビルドを失敗させない（lint は `npm run lint` で明示的に実行する）
    ignoreDuringBuilds: true,
  },
  // @faker-js/faker は ESM 専用配布のため、ビルド／テスト時にトランスパイル対象に含める
  transpilePackages: ['@faker-js/faker'],
};

module.exports = nextConfig;