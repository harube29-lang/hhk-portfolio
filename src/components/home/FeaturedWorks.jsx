'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { PROJECTS, categoryLabel } from '@/data/projects'

/* 작업물 띠 (레퍼런스: 그르르 스튜디오 메인)
   - 데스크톱: 세로형 이미지 타일이 왼쪽으로 계속 흐르는 무한 루프 (호버 시 일시정지)
   - 모바일: 손가락으로 옆으로 넘기는 스와이프 목록 + 안내 문구 + 진행 막대
     (자동으로 흐르면 터치로 조작할 수 없어 옆으로 넘길 수 있다는 걸 알기 어려움) */
function Tile({ project, hidden, className = '' }) {
  return (
    <li className={`shrink-0 ${className}`}>
      <Link
        href={`/project/${project.slug}`}
        data-cursor="VIEW"
        tabIndex={hidden ? -1 : undefined}
        className="group relative block aspect-[4/5] overflow-hidden bg-paper-2"
      >
        <Image
          src={project.cover ?? project.thumb.src}
          alt={hidden ? '' : `${project.title} 작업 이미지`}
          fill
          sizes="(min-width: 1024px) 16vw, (min-width: 768px) 28vw, 58vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
        />
        {/* 데스크톱: 호버 시 제목 */}
        <div className="absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-4 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:flex">
          <span className="text-[11px] font-bold tracking-widest text-accent">{categoryLabel(project.category)}</span>
          <span className="mt-1 text-base font-extrabold md:text-lg">{project.title}</span>
        </div>
      </Link>
      {/* 모바일: 제목을 항상 아래에 표시 */}
      <p className="mt-2 text-[13px] font-bold md:hidden">{project.title}</p>
    </li>
  )
}

/* 모바일 스와이프 목록 */
function MobileSwipe() {
  const ref = useRef(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const progress = useSpring(scrollXProgress, { stiffness: 200, damping: 30 })

  return (
    <div className="md:hidden">
      <ul
        ref={ref}
        className="flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PROJECTS.map((p) => (
          <Tile key={p.slug} project={p} className="w-[58vw] snap-start" />
        ))}
      </ul>

      {/* 스와이프 안내 + 진행 막대 */}
      <div className="mt-5 flex items-center gap-4 px-5">
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-line">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-accent" />
        </div>
        <p className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted">
          옆으로 넘겨보세요
          <motion.span
            aria-hidden
            className="text-accent"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </p>
      </div>
    </div>
  )
}

/* 데스크톱 무한 흐름 — 같은 목록 2번 이어 붙여 -50% 까지 이동 */
function DesktopMarquee() {
  return (
    <div className="group/marquee hidden overflow-hidden motion-reduce:overflow-x-auto md:block">
      <div className="animate-marquee flex w-max group-hover/marquee:[animation-play-state:paused]" style={{ animationDuration: '45s' }}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-6 pr-6" aria-hidden={copy === 1 || undefined}>
            {PROJECTS.map((p) => (
              <Tile key={p.slug} project={p} hidden={copy === 1} className="w-[28vw] lg:w-[16vw]" />
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default function FeaturedWorks() {
  return (
    <section aria-label="작업물" className="pb-20 md:pb-32">
      <div className="mx-auto mb-5 flex max-w-[1600px] items-end justify-between gap-4 px-5 md:mb-6 md:px-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-muted md:text-xs">( 01 ) SELECTED WORKS</p>
        <Link href="/project" className="group flex shrink-0 items-center gap-2 text-sm font-bold">
          전체 프로젝트 보기
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>

      <MobileSwipe />
      <DesktopMarquee />
    </section>
  )
}
