'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { categoryLabel } from '@/data/projects'

const EASE = [0.16, 1, 0.3, 1]

/* 프로젝트 상세 모달
   - ESC / 배경 클릭 / 닫기 버튼으로 닫힘
   - 열려 있는 동안 배경 스크롤 잠금
   - 모바일: 화면 전체, 데스크톱: 아래에서 올라오는 시트 */
export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return
    document.body.classList.add('is-locked')
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-[60] flex items-end justify-center md:px-6 md:pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.15 } }}
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden bg-paper md:h-[calc(100%-1rem)] md:rounded-t-3xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* 상단 바 */}
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 md:px-10">
              <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold tracking-wider text-paper">
                {categoryLabel(project.category)}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl transition-colors hover:bg-ink hover:text-paper"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* 개요 */}
              <div className="grid gap-8 px-5 py-10 md:grid-cols-12 md:px-10 md:py-16">
                <div className="md:col-span-7">
                  <p className="font-display text-sm font-bold tracking-widest text-accent">{project.titleEn}</p>
                  <h2 id="project-modal-title" className="mt-2 text-4xl font-extrabold tracking-tight md:text-6xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-lg font-semibold text-ink/80">{project.subtitle}</p>
                </div>
                <div className="flex flex-col gap-6 md:col-span-5">
                  <p className="leading-relaxed text-ink/80">{project.description}</p>
                  <dl className="grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                    <div>
                      <dt className="text-muted">TYPE</dt>
                      <dd className="mt-1 font-semibold">{project.badge}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">KEYWORD</dt>
                      <dd className="mt-1 font-semibold">{project.tags.join(' · ')}</dd>
                    </div>
                  </dl>
                  {project.siteUrl && (
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white transition-transform hover:scale-105"
                    >
                      사이트 보기 <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 디자인 컷 */}
              <div className="space-y-10 px-3 pb-16 md:space-y-16 md:px-10 md:pb-24">
                {project.images.length === 0 && (
                  <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: `${project.thumb.w}/${project.thumb.h}` }}>
                    <Image src={project.thumb.src} alt={`${project.title} 대표 화면`} fill sizes="(min-width: 1152px) 1100px, 100vw" className="object-cover" />
                  </div>
                )}
                {project.images.map((img, i) => (
                  <motion.figure
                    key={img.src}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5% 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    <figcaption className="mb-3 flex items-center gap-3 text-sm font-semibold">
                      <span className="font-display text-accent">{String(i + 1).padStart(2, '0')}</span>
                      {img.label}
                    </figcaption>
                    <Image
                      src={img.src}
                      alt={`${project.title} ${img.label}`}
                      width={img.w}
                      height={img.h}
                      sizes="(min-width: 1152px) 1100px, 100vw"
                      className={`h-auto w-full rounded-2xl bg-paper-2 ${img.w < 1000 ? 'mx-auto max-w-[480px]' : ''}`}
                    />
                  </motion.figure>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
