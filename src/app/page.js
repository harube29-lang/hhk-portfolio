import Hero from '@/components/home/Hero'
import Roles from '@/components/home/Roles'
import FeaturedWorks from '@/components/home/FeaturedWorks'

/* 레퍼런스처럼 히어로 바로 아래에 작업물 흐름 띠 배치 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <Roles />
    </>
  )
}
