'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { TIMELINE } from '@/data/profile'
import { LineReveal, Reveal } from '@/components/ui/Reveal'

/* 스크롤 진행에 따라 세로선이 채워지는 타임라인 */
export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-36">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted">( 02 ) CAREER &amp; ACTIVITY</p>
            <h2 className="font-display text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
              <LineReveal lines={['Path', 'So Far']} />
            </h2>
          </div>
        </div>

        <div ref={ref} className="relative md:col-span-7 md:col-start-6">
          <div className="absolute bottom-0 left-[5px] top-0 w-px bg-line" />
          <motion.div style={{ scaleY }} className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent" />

          <ol className="space-y-8 md:space-y-16">
            {TIMELINE.map((item, i) => (
              <li key={i} className="relative pl-10 md:pl-14">
                <span className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full border-2 border-accent bg-paper" />
                <Reveal>
                  <p className="font-display text-sm font-bold tracking-widest text-accent">{item.year}</p>
                  <h3 className="mt-1 text-base font-bold md:mt-2 md:text-2xl">{item.title}</h3>
                  {item.desc && <p className="mt-1 text-sm text-muted md:mt-2 md:text-base">{item.desc}</p>}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
