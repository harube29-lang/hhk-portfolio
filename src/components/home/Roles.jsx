'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ROLES = [
  { word: 'WEB', kr: '웹 · 모바일 디자인', desc: '브랜드 성격을 읽어낸 반응형 레이아웃', dir: 1 },
  { word: 'UX/UI', kr: '사용자 경험 설계', desc: '누구나 헤매지 않는 흐름과 화면', dir: -1, accent: true },
  { word: 'DESIGN', kr: '카드뉴스 · 그래픽', desc: '한 장 안에서 핵심이 읽히는 정보 위계', dir: 1 },
]

/* 스크롤에 따라 좌우로 흐르는 직무 타이포 한 줄 */
function RoleRow({ role, index, progress }) {
  const x = useTransform(progress, [0, 1], role.dir > 0 ? ['-8%', '6%'] : ['8%', '-6%'])

  return (
    <div className="group relative border-t border-line py-6 md:py-8">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 md:flex-row md:items-center md:justify-between md:px-10">
        <motion.span
          style={{ x }}
          className={`block whitespace-nowrap font-display text-[clamp(4rem,17vw,15rem)] font-extrabold leading-[0.85] tracking-[-0.04em] transition-colors duration-500 ${
            role.accent ? 'text-accent' : 'group-hover:text-accent'
          }`}
        >
          {role.word}
        </motion.span>
        <div className="flex shrink-0 items-start gap-4 md:max-w-[16rem] md:flex-col md:gap-1 md:text-right">
          <span className="font-display text-sm font-bold text-accent">0{index + 1}</span>
          <div>
            <p className="font-bold">{role.kr}</p>
            <p className="text-sm text-muted">{role.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Roles() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section id="roles" ref={ref} className="overflow-hidden pb-24 pt-10 md:pb-36">
      {ROLES.map((r, i) => (
        <RoleRow key={r.word} role={r} index={i} progress={scrollYProgress} />
      ))}

      {/* 마퀴 띠 — 기울이면 양 끝 모서리가 화면 안으로 들어와 잘려 보이므로 화면보다 넓게 */}
      <div className="-mx-[10vw] mt-16 -rotate-2 bg-accent py-4 text-white md:mt-24 md:py-5" aria-hidden>
        <div className="animate-marquee flex w-max whitespace-nowrap font-display text-2xl font-extrabold tracking-tight md:text-4xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {['WEB & MOBILE', 'UX/UI', 'CARD NEWS', 'BRANDING', 'VIBE CODING', 'WEB & MOBILE', 'UX/UI', 'CARD NEWS'].map((t, i) => (
                <span key={i} className="px-6">
                  {t} <span className="ml-6">✳</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
