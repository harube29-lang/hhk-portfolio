'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PROFILE } from '@/data/profile'
import { LineReveal, Reveal } from '@/components/ui/Reveal'
import { useOpeningDone } from '@/components/layout/Opening'

const PARAGRAPHS = [
  '제품부터 디지털 화면까지, 디자인의 형태는 달라도 그 중심에는 늘 사람이 있습니다.',
  '연령이나 환경에 구애받지 않고 누구나 소외되지 않도록 돕는 유니버셜 디자인의 가치를 바탕으로, 복잡함은 덜어내고 누구나 직관적으로 이해할 수 있는 경험을 설계합니다.',
  '어떤 매체나 플랫폼을 마주하더라도 사용자가 헤매지 않고 자연스럽게 스며드는 레이아웃과 화면을 만들어가고자 합니다.',
]

export default function AboutIntro() {
  const ready = useOpeningDone()
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-36 md:pt-44">
      <p className="mb-6 text-xs font-semibold tracking-[0.2em] text-muted">( ABOUT ME ) INDUSTRIAL DESIGN → UX/UI</p>

      <h1 className="mb-16 text-[clamp(2.25rem,7vw,6.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] md:mb-24">
        <LineReveal
          lines={[
            '누구나 편안하게',
            <>
              머무는 <span className="text-accent">디자인</span>
            </>,
          ]}
          play={ready}
        />
      </h1>

      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        {/* 비주얼 */}
        <div className="md:col-span-3">
          <div ref={imgRef} className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-3xl bg-paper-2 md:max-w-[240px]">
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%_0]">
              <Image src={PROFILE.photo} alt={`${PROFILE.name} 프로필 사진`} fill priority sizes="240px" className="object-cover" />
            </motion.div>
          </div>
          {/* 사진이 작아져 배지 대신 캡션으로 표기 */}
          <p className="mt-3 text-xs font-semibold text-muted">{PROFILE.major}</p>
        </div>

        {/* 텍스트 */}
        <div className="md:col-span-8 md:col-start-5">
          {/* 첫 문장은 크게·굵게, 이어지는 서브 문구는 작게 */}
          <Reveal as="p" className="text-[clamp(1.5rem,2.6vw,2.5rem)] font-extrabold leading-[1.35] tracking-[-0.02em]">
            {PARAGRAPHS[0]}
          </Reveal>
          <div className="mt-8 max-w-xl space-y-4 border-t border-line pt-8 text-[15px] leading-relaxed text-ink/70 md:text-base md:leading-relaxed">
            {PARAGRAPHS.slice(1).map((p, i) => (
              <Reveal key={i} delay={(i + 1) * 0.08} as="p">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
