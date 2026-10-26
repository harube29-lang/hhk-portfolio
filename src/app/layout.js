import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

export const metadata = {
  title: '황혜경 — Web · UX/UI · Card News Designer',
  description: '탄탄한 기획과 관찰력으로 브랜드 성격을 읽어내 완성도 높은 디자인을 구현하는 디자이너 황혜경의 포트폴리오',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={bricolage.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-dvh">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
