'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { CATEGORIES, PROJECTS } from '@/data/projects'
import { LineReveal } from '@/components/ui/Reveal'
import { useOpeningDone } from '@/components/layout/Opening'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

const EASE = [0.16, 1, 0.3, 1]

const countOf = (id) => (id === 'ALL' ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length)

export default function ProjectGallery() {
  const ready = useOpeningDone()
  const [filter, setFilter] = useState('ALL')
  const [active, setActive] = useState(null)

  const items = useMemo(() => (filter === 'ALL' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)), [filter])

  /* URL 해시(#slug)로 모달 열기 — HOME 갤러리에서 넘어올 때 사용 */
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1))
      setActive(PROJECTS.find((p) => p.slug === slug) ?? null)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const open = useCallback((project) => {
    setActive(project)
    history.replaceState(null, '', `#${project.slug}`)
  }, [])

  const close = useCallback(() => {
    setActive(null)
    history.replaceState(null, '', window.location.pathname)
  }, [])

  return (
    <section className="mx-auto min-h-screen max-w-[1600px] px-5 pb-28 pt-32 md:px-10 md:pb-40 md:pt-44">
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-muted">( WORK ) ALL PROJECTS</p>
          <h1 className="font-display text-[clamp(3.5rem,13vw,12rem)] font-extrabold leading-[0.85] tracking-[-0.05em]">
            <LineReveal
              play={ready}
              lines={[
                <>
                  Project<span className="text-accent">.</span>
                </>,
              ]}
            />
          </h1>
        </div>
        <p className="max-w-sm text-muted">
          카테고리를 선택해 작업을 살펴보세요. 카드를 누르면 상세 디자인 컷을 볼 수 있습니다.
        </p>
      </div>

      {/* 필터 탭 — 모바일에서는 가로 스크롤 */}
      <LayoutGroup>
        <div
          role="tablist"
          aria-label="프로젝트 카테고리"
          className="-mx-5 mb-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mb-16 md:flex-wrap md:px-0"
        >
          {CATEGORIES.map((c) => {
            const selected = filter === c.id
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(c.id)}
                className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold tracking-wide transition-colors ${
                  selected ? 'border-ink text-paper' : 'border-line text-ink hover:border-ink'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {c.label}
                  <sup className={`ml-1 ${selected ? 'text-accent' : 'text-muted'}`}>{countOf(c.id)}</sup>
                </span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>

      {/* 그리드 — 필터 변경 시 layout 애니메이션으로 재정렬 */}
      <motion.ul layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
            >
              <ProjectCard project={p} onOpen={open} priority={i < 3} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line py-28 text-center"
          >
            <p className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              Coming Soon<span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-muted">새로운 작업을 준비하고 있습니다.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal project={active} onClose={close} />
    </section>
  )
}
