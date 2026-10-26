'use client'

import { motion } from 'framer-motion'
import { SKILLS, TOOLS } from '@/data/profile'
import { LineReveal, Reveal } from '@/components/ui/Reveal'

export default function Skills() {
  return (
    <section className="bg-ink py-24 text-paper md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-paper/50">( 01 ) SKILLS</p>
            <h2 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              <LineReveal lines={['What I', 'Do Best']} />
            </h2>
          </div>
          <Reveal className="flex max-w-md flex-wrap gap-2 md:justify-end">
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full border border-paper/25 px-4 py-1.5 text-sm">
                {t}
              </span>
            ))}
          </Reveal>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-3xl bg-paper/15 sm:grid-cols-2">
          {SKILLS.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
