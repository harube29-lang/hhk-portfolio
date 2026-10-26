import AboutIntro from '@/components/about/AboutIntro'
import Skills from '@/components/about/Skills'
import Timeline from '@/components/about/Timeline'

export const metadata = {
  title: 'ABOUT ME — 황혜경',
  description: '누구나 편안하게 머무는 디자인. 산업디자인 전공 기반 UX/UI 디자이너 황혜경 소개',
}

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Skills />
      <Timeline />
    </>
  )
}
