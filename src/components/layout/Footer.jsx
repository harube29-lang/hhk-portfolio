'use client'

import { motion } from 'framer-motion'
import { CONTACT, PROFILE, NAV_ITEMS } from '@/data/profile'
import Magnetic from '@/components/ui/Magnetic'
import { LineReveal } from '@/components/ui/Reveal'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-16 md:px-10 md:pt-36">
        <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-paper/50">LET&apos;S WORK TOGETHER</p>

        <h2 className="text-[clamp(1.85rem,7vw,6.5rem)] font-extrabold leading-[1.05] tracking-tight">
          <LineReveal lines={['아이디어를', '현실로 만드는 디자이너']} />
        </h2>

        <div className="mt-10 grid gap-8 md:mt-20 md:gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Magnetic strength={0.15}>
            <a
              href={`mailto:${CONTACT.email}`}
              data-cursor="MAIL"
              className="group inline-flex flex-wrap items-center gap-x-4 font-display text-[clamp(1.25rem,4.5vw,3.75rem)] font-bold tracking-tight"
            >
              <span className="relative">
                {CONTACT.email}
                <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <span className="text-accent transition-transform duration-500 group-hover:rotate-45" aria-hidden>
                ↗
              </span>
            </a>
          </Magnetic>

          <dl className="text-sm md:justify-self-end">
            <div>
              <dt className="mb-2 text-xs tracking-[0.2em] text-paper/40">PHONE</dt>
              <dd>
                <a href={`tel:${CONTACT.phone.replaceAll('-', '')}`} className="font-display text-xl font-bold tracking-tight transition-colors hover:text-accent md:text-4xl">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* 대형 이름 — 글자 폭 ≈ 글꼴 크기 × 6.04 이므로, 여백·스크롤바를 뺀 화면 폭 ÷ 6.2 로 잡아 잘리지 않게 */}
        <div className="mt-14 md:mt-20">
          <motion.p
            aria-hidden
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap font-display text-[calc((100vw-48px)/6.2)] font-extrabold leading-[1] tracking-tighter text-paper/[0.08] md:text-[min(calc((100vw-96px)/6.2),245px)]"
          >
            HYE KYOUNG
          </motion.p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <span>© 2026 {PROFILE.name} · {PROFILE.slogan}</span>
          <nav className="flex gap-5" aria-label="푸터 메뉴">
            {NAV_ITEMS.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-paper">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
