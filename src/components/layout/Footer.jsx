'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CONTACT, PROFILE, NAV_ITEMS } from '@/data/profile'
import Magnetic from '@/components/ui/Magnetic'
import { LineReveal } from '@/components/ui/Reveal'
import Link from 'next/link'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])
  const links = CONTACT.links.filter((l) => l.href)

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-24 md:px-10 md:pt-36">
        <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-paper/50">LET&apos;S WORK TOGETHER</p>

        <h2 className="text-[clamp(2.25rem,7vw,6.5rem)] font-extrabold leading-[1.05] tracking-tight">
          <LineReveal lines={['아이디어를', '현실로 만드는 디자이너']} />
        </h2>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1.4fr_1fr] md:items-end">
          <Magnetic strength={0.15}>
            <a
              href={`mailto:${CONTACT.email}`}
              data-cursor="MAIL"
              className="group inline-flex flex-wrap items-center gap-x-4 font-display text-[clamp(1.5rem,4.5vw,3.75rem)] font-bold tracking-tight"
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

          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="mb-2 text-paper/40">PHONE</dt>
              <dd>
                <a href={`tel:${CONTACT.phone.replaceAll('-', '')}`} className="hover:text-accent">
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-2 text-paper/40">SOCIAL</dt>
              <dd className="flex flex-col gap-1">
                {links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {l.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <motion.p
          aria-hidden
          style={{ x }}
          className="mt-20 whitespace-nowrap font-display text-[19vw] font-extrabold leading-[0.8] tracking-tighter text-paper/[0.07]"
        >
          HYEKYUNG ● DESIGN
        </motion.p>

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
