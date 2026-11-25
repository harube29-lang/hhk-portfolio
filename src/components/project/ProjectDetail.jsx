'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { categoryLabel } from '@/data/projects'
import { LineReveal } from '@/components/ui/Reveal'
import { useOpeningDone } from '@/components/layout/Opening'

const EASE = [0.16, 1, 0.3, 1]

/* 이미지 열 너비 — 원본 비율에 맞춰 상세페이지처럼 세로로 길게 이어 붙임
   폭이 좁은 원본(모바일 작업 845px)은 원본 폭까지만 키워 글씨가 읽히면서도 깨지지 않게 */
const columnWidth = (project) => {
  if (project.layout === 'grid') return 'max-w-[600px]'
  /* wide: 여러 화면을 한 장에 담은 큰 작업물 — 이미지 열을 꽉 채워 크게 (모바일·태블릿은 좌우 여백 없이) */
  if (project.wide) return 'max-w-none'
  if (project.images.some((img) => img.w < 1000)) return 'max-w-[845px]'
  return 'max-w-[860px]'
}

/* 프로젝트 상세 페이지 (레퍼런스: 그르르 스튜디오 WORK 상세)
   - 검은 배경 + 왼쪽 고정 정보 패널
   - 오른쪽: 작업 이미지를 여백 없이 세로로 이어서 노출 */
export default function ProjectDetail({ project, prev, next }) {
  const ready = useOpeningDone()
  const isGrid = project.layout === 'grid'
  /* 세로로 긴 작업 이미지는 모바일에서 좌우 여백 없이 화면 폭에 꽉 차게 (글씨 가독성) */
  const isFullBleed = !isGrid && project.images.length > 0

  return (
    <article className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(360px,32%)_1fr]">
        {/* ── 왼쪽 고정 정보 패널 ── */}
        <aside className="px-5 pb-10 pt-24 md:px-10 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:pb-10 lg:pt-32">
          <div>
            <Link href="/project" className="group mb-6 inline-flex items-center gap-2 text-xs font-semibold md:mb-10 md:text-sm text-paper/60 hover:text-paper">
              <span className="transition-transform group-hover:-translate-x-1" aria-hidden>
                ←
              </span>
              ALL PROJECTS
            </Link>

            <div className="mb-5 flex items-center gap-2">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wider text-white">
                {categoryLabel(project.category)}
              </span>
              <span className="rounded-full border border-paper/25 px-3 py-1 text-xs font-semibold text-paper/70">{project.badge}</span>
            </div>

            <p className="font-display text-sm font-bold tracking-widest text-accent">{project.titleEn}</p>
            <h1 className="mt-2 text-[clamp(1.85rem,4vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight">
              <LineReveal lines={[project.title]} play={ready} />
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            >
              {project.subtitle && <p className="mt-3 text-lg font-semibold text-paper/90 md:mt-4">{project.subtitle}</p>}
              {project.description && (
                <p className="mt-4 max-w-md text-base leading-[1.75] text-paper/75 md:mt-6 md:leading-relaxed md:text-paper/60">{project.description}</p>
              )}

              <dl className="mt-6 grid max-w-md grid-cols-2 gap-4 border-t border-paper/15 pt-4 text-sm md:mt-8 md:pt-5">
                <div>
                  <dt className="text-paper/40">TYPE</dt>
                  <dd className="mt-1 font-semibold">{project.badge}</dd>
                </div>
                <div>
                  <dt className="text-paper/40">KEYWORD</dt>
                  <dd className="mt-1 font-semibold">{project.tags.join(' · ')}</dd>
                </div>
              </dl>

              {project.siteUrl && (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white transition-transform hover:scale-105"
                >
                  사이트 보기 <span aria-hidden>↗</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* 이전 / 다음 프로젝트 (데스크톱 패널 하단) */}
          <PrevNext prev={prev} next={next} className="hidden lg:grid" />
        </aside>

        {/* ── 작업 이미지 ── */}
        <div className={`${isFullBleed ? 'px-0' : 'px-3'} pb-20 ${project.wide ? 'lg:px-10' : 'md:px-10'} lg:pt-28 lg:pb-28`}>
          <div className={`mx-auto ${columnWidth(project)} ${isGrid ? 'space-y-4' : project.gap ? 'space-y-5 md:space-y-8' : ''}`}>
            {project.images.length === 0 && (
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: `${project.thumb.w}/${project.thumb.h}` }}>
                <Image src={project.thumb.src} alt={`${project.title} 대표 화면`} fill priority sizes="860px" className="object-cover" />
              </div>
            )}
            {project.mobileImages ? (
              <>
                {/* 데스크톱: 한 장 전체 · 모바일(lg 미만): 구역별로 잘라 글씨가 읽히게 */}
                <div className="hidden lg:block">
                  <WorkImages project={project} images={project.images} isGrid={isGrid} />
                </div>
                <div className="lg:hidden">
                  <WorkImages project={project} images={project.mobileImages} isGrid={isGrid} />
                </div>
              </>
            ) : (
              <WorkImages project={project} images={project.images} isGrid={isGrid} />
            )}
          </div>

          <PrevNext prev={prev} next={next} className={`mx-auto mt-16 grid max-w-[860px] lg:hidden ${isFullBleed ? 'px-5' : 'px-2'}`} />
        </div>
      </div>
    </article>
  )
}

function WorkImages({ project, images, isGrid }) {
  return images.map((img, i) => {
    const image = (
      <Image
        src={img.src}
        alt={`${project.title} ${img.label}`}
        width={img.w}
        height={img.h}
        priority={i === 0}
        sizes="860px"
        className={`block h-auto w-full ${isGrid ? 'rounded-2xl' : ''}`}
      />
    )
    return (
      <motion.div
        key={img.src}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* wide 작업물은 탭/클릭하면 원본 해상도로 열려 확대해서 볼 수 있음 */}
        {project.wide ? (
          <a href={img.src} target="_blank" rel="noreferrer" className="block cursor-zoom-in" title="원본 크게 보기">
            {image}
          </a>
        ) : (
          image
        )}
      </motion.div>
    )
  })
}

function PrevNext({ prev, next, className = '' }) {
  return (
    <nav aria-label="다른 프로젝트" className={`grid-cols-2 gap-3 ${className}`}>
      <Link href={`/project/${prev.slug}`} className="group rounded-2xl border border-paper/15 p-4 transition-colors hover:border-paper/50">
        <span className="text-xs font-semibold tracking-widest text-paper/40">← PREV</span>
        <span className="mt-1 block truncate font-bold group-hover:text-accent">{prev.title}</span>
      </Link>
      <Link href={`/project/${next.slug}`} className="group rounded-2xl border border-paper/15 p-4 text-right transition-colors hover:border-paper/50">
        <span className="text-xs font-semibold tracking-widest text-paper/40">NEXT →</span>
        <span className="mt-1 block truncate font-bold group-hover:text-accent">{next.title}</span>
      </Link>
    </nav>
  )
}
