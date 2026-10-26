'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LineReveal } from '@/components/ui/Reveal'
import { useOpeningDone } from '@/components/layout/Opening'

const EASE = [0.16, 1, 0.3, 1]

const LINES = [
  '안녕하세요,',
  <>
    탄탄한 기획과 관찰력 <span className="text-accent">+</span>
  </>,
  '브랜드 성격을 알차게 읽어내',
  '완성도 높은 디자인을 구현하는',
  <>
    디자이너 <span className="relative inline-block">황혜경<HeroUnderline /></span>입니다
  </>,
]

/* 이름 아래 손그림 느낌의 밑줄 */
function HeroUnderline() {
  const ready = useOpeningDone()
  return (
    <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute -bottom-[0.02em] left-0 h-[0.22em] w-full text-accent">
      <motion.path
        d="M2 14 C 50 4, 120 4, 198 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: ready ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
      />
    </svg>
  )
}

/* 원형으로 회전하는 스티커 배지 */
function SpinBadge() {
  const text = 'UX/UI DESIGNER • PORTFOLIO 2026 • '
  return (
    <motion.div
      aria-hidden
      className="relative h-28 w-28 md:h-36 md:w-36"
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-ink font-display text-[9.4px] font-bold tracking-[0.12em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-accent" />
    </motion.div>
  )
}

export default function Hero() {
  const ready = useOpeningDone()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[86svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-14">
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-[1600px]">
        <motion.div
          className="mb-8 flex items-center justify-between text-xs font-semibold tracking-[0.2em] text-muted md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>WEB &amp; MOBILE · UX/UI · CARD NEWS</span>
        </motion.div>

        <h1 className="text-[clamp(1.6rem,4.2vw,4.25rem)] font-extrabold leading-[1.22] tracking-[-0.03em]">
          <LineReveal lines={LINES} play={ready} stagger={0.1} delay={0.1} />
        </h1>

        <div className="mt-10 flex items-end justify-between gap-6 md:mt-16">
          <motion.a
            href="#roles"
            className="group flex items-center gap-3 text-sm font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-paper">
              ↓
            </span>
            Scroll to explore
          </motion.a>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
          >
            <SpinBadge />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
