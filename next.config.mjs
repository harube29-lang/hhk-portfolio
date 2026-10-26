/* GitHub Pages 배포 시 GitHub Actions 에서 PAGES_BASE_PATH=/hhk-portfolio 를 주입.
   로컬(npm run dev)에서는 빈 값이라 http://localhost:3000/ 그대로 동작 */
const basePath = process.env.PAGES_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* 정적 사이트로 내보내기 (out 폴더) — GitHub Pages 는 정적 파일만 호스팅 */
  output: 'export',
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  /* 정적 내보내기에서는 서버 이미지 최적화 불가 → public/images 를 미리 WebP 로 압축해 둠 */
  images: {
    unoptimized: true,
  },
  /* cacheComponents(PPR)는 output: 'export' 와 함께 쓸 수 없어 사용하지 않음 */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
