'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV_ITEMS } from '@/data/profile'
import Magnetic from '@/components/ui/Magnetic'

const EASE = [0.16, 1, 0.3, 1]

export function Logo({ className = '' }) {
  return (
    <Link href="/" className={`font-display text-lg font-extrabold tracking-tight ${className}`} aria-label="홈으로">
      HYE KYOUNG<span className="text-accent">●</span>
    </Link>
  )
}

/* 지능형 헤더
   - 아래로 스크롤 시 숨김, 위로 스크롤 시 노출
   - 상단을 벗어나면 블러 배경 적용
   - 모바일: 풀스크린 메뉴 */
export default function Header() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 120)
    setScrolled(y > 24)
  })

  /* 페이지 이동 시 모바일 메뉴 닫기 (렌더 중 이전 경로와 비교) */
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
  }, [open])

  /* 프로젝트 상세(검은 배경)에서는 헤더를 밝은 글자로 반전 — 모바일 메뉴가 열리면 원래 색 */
  const dark = /^\/project\/[^/]+/.test(pathname) && !open

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open
            ? dark
              ? 'border-b border-paper/10 bg-ink/80 backdrop-blur-md'
              : 'border-b border-line bg-paper/80 backdrop-blur-md'
            : 'border-b border-transparent'
        } ${dark ? 'text-paper' : 'text-ink'
        }`}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <Logo className="relative z-10" />

          <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide"
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${dark ? 'bg-paper' : 'bg-ink'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={`relative ${isActive(item.href) ? (dark ? 'text-ink' : 'text-paper') : 'hover:text-accent'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:inline-block">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
              >
                Contact <span aria-hidden>↗</span>
              </a>
            </Magnetic>

            <button
              type="button"
              className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
              aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <motion.span className="block h-[2px] w-6 bg-current" animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} />
              <motion.span className="block h-[2px] w-6 bg-current" animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2" aria-label="모바일 메뉴">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`font-display text-5xl font-extrabold tracking-tight ${isActive(item.href) ? 'text-accent' : ''}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-full bg-ink px-6 py-4 font-bold text-paper"
            >
              Contact <span aria-hidden>↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
