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

const PRINCIPLES = [
  { k: 'Observe', v: '불편함을 먼저 읽는 관찰' },
  { k: 'Simplify', v: '복잡함은 덜어내기' },
  { k: 'Include', v: '누구도 소외되지 않게' },
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
        <div className="md:col-span-5">
          <div ref={imgRef} className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper-2">
            <motion.div style={{ y: imgY }} className="absolute inset-[-8%_0]">
              <Image src={PROFILE.photo} alt={`${PROFILE.name} 프로필 사진`} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </motion.div>
            <span className="absolute bottom-4 left-4 rounded-full bg-paper px-4 py-2 text-xs font-bold">
              {PROFILE.major}
            </span>
          </div>
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
          <div className="space-y-6 text-lg leading-relaxed md:text-xl md:leading-relaxed">
            {PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} as="p" className={i === 0 ? 'font-bold' : 'text-ink/80'}>
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <li key={p.k} className="border-b border-line py-5 sm:border-b-0 sm:pr-4">
                  <p className="font-display text-2xl font-bold">{p.k}</p>
                  <p className="mt-1 text-sm text-muted">{p.v}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
