'use client'

import { motion } from 'framer-motion'
import { SKILLS, TOOL_GROUPS } from '@/data/profile'
import { LineReveal, Reveal } from '@/components/ui/Reveal'

const EASE = [0.16, 1, 0.3, 1]

/* 툴 한 줄 — 뷰포트 진입 시 숙련도 바가 왼쪽부터 차오름 */
function ToolRow({ tool, index }) {
  return (
    <li className="group border-b border-paper/15 py-6 md:py-8">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-3xl font-extrabold tracking-tight transition-colors group-hover:text-accent md:text-5xl">{tool.name}</p>
          <p className="mt-2 text-sm text-paper/60 md:text-base">{tool.desc}</p>
        </div>
        <p className="shrink-0 font-display text-4xl font-extrabold tabular-nums text-accent md:text-6xl">
          {tool.level}
          <span className="text-lg text-paper/50 md:text-2xl">%</span>
        </p>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-paper/10 md:h-2.5">
        <motion.div
          className="h-full origin-left rounded-full bg-accent"
          style={{ width: `${tool.level}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: EASE }}
        />
      </div>
    </li>
  )
}

export default function Skills() {
  return (
    <section className="bg-ink py-24 text-paper md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 md:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-paper/50">( 01 ) SKILLS</p>
          <h2 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            <LineReveal lines={['What I', 'Do Best']} />
          </h2>
        </div>

        {/* 툴 · 기술 스택 */}
        <div className="mb-24 md:mb-32">
          <Reveal className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              Tool Stack<span className="text-accent">.</span>
            </h3>
            <p className="max-w-sm text-paper/50">디자인 툴을 중심으로, 직접 화면을 구현할 수 있는 프론트엔드 기초까지 다룹니다.</p>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {TOOL_GROUPS.map((g) => (
              <div key={g.group}>
                <p className="mb-2 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-paper/50">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {g.group.toUpperCase()}
                </p>
                <ul className="border-t border-paper/15">
                  {g.items.map((t, i) => (
                    <ToolRow key={t.name} tool={t} index={i} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* 주요 역량 */}
        <ul className="grid gap-px overflow-hidden rounded-3xl bg-paper/15 sm:grid-cols-2">
          {SKILLS.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
              className="group relative overflow-hidden bg-ink p-7 md:p-10"
            >
              {/* 호버 시 아래에서 차오르는 포인트 컬러 */}
              <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <div className="relative">
                <span className="font-display text-sm font-bold text-accent transition-colors group-hover:text-ink">{s.no}</span>
                <h3 className="mt-10 font-display text-3xl font-bold tracking-tight md:mt-16 md:text-5xl">{s.name}</h3>
                <p className="mt-3 max-w-sm text-paper/60 transition-colors group-hover:text-paper">{s.desc}</p>
              </div>
            </motion.li>
          ))}
        </ul>

      </div>
    </section>
  )
}
