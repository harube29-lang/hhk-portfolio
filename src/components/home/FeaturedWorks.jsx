'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PROJECTS } from '@/data/projects'
import ProjectCard from '@/components/project/ProjectCard'
import Magnetic from '@/components/ui/Magnetic'
import { LineReveal, Reveal } from '@/components/ui/Reveal'

const FEATURED = PROJECTS.filter((p) => p.featured).slice(0, 3)

/* 데스크톱 비대칭 배치 + 카드별 패럴랙스 속도 차 */
const LAYOUT = [
  { col: 'md:col-span-7', aspect: 'aspect-[4/3]', speed: 0 },
  { col: 'md:col-span-5 md:mt-40', aspect: 'aspect-[4/5]', speed: -60 },
  { col: 'md:col-span-5 md:col-start-3', aspect: 'aspect-[4/5]', speed: -30 },
]

function ParallaxItem({ project, layout }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, layout.speed])

  return (
    <motion.div ref={ref} style={{ y }} className={layout.col}>
      <Reveal>
        <ProjectCard
          project={project}
          href={`/project#${project.slug}`}
          aspect={layout.aspect}
          sizes="(min-width: 768px) 55vw, 100vw"
        />
      </Reveal>
    </motion.div>
  )
}

export default function FeaturedWorks() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
      <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted">( 01 ) SELECTED WORKS</p>
          <h2 className="font-display text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            <LineReveal lines={['Selected', <>Works<sup className="ml-2 align-super text-[0.3em] text-accent">({String(FEATURED.length).padStart(2, '0')})</sup></>]} />
          </h2>
        </div>
        <p className="max-w-sm text-muted">
          브랜드의 성격을 읽고, 사용자가 헤매지 않는 흐름을 설계한 작업들입니다.
        </p>
      </div>

      <div className="grid gap-14 md:grid-cols-12 md:gap-x-10 md:gap-y-24">
        {FEATURED.map((p, i) => (
          <ParallaxItem key={p.slug} project={p} layout={LAYOUT[i % LAYOUT.length]} />
        ))}
      </div>

      <div className="mt-20 flex justify-center md:mt-28">
        <Magnetic>
          <Link
            href="/project"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink px-8 py-5 font-bold"
          >
            <span className="absolute inset-0 translate-y-full rounded-full bg-ink transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
            <span className="relative transition-colors duration-500 group-hover:text-paper">전체 프로젝트 보기</span>
            <span className="relative transition-colors duration-500 group-hover:text-accent" aria-hidden>
              →
            </span>
          </Link>
        </Magnetic>
      </div>
    </section>
  )
}
