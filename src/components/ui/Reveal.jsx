'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/* 뷰포트 진입 시 아래에서 위로 페이드인 */
export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}

/* 줄 단위 마스크 리빌 — 텍스트가 아래에서 밀려 올라옴
   lines : 줄 배열 (문자열 또는 JSX)
   play  : 지정하면 뷰포트 대신 이 값으로 재생 제어 (예: 오프닝 종료 후 재생) */
export function LineReveal({ lines, className, lineClassName, delay = 0, stagger = 0.09, play }) {
  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <motion.span className={className} initial="hidden" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 1, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
