'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.76, 0, 0.24, 1]

/* 오프닝 종료 여부 — 히어로 등장 애니메이션이 오프닝 뒤에서 미리 재생되지 않도록 공유 */
const OpeningContext = createContext(true)
export const useOpeningDone = () => useContext(OpeningContext)

/* 첫 진입(새로고침) 시 1회 재생되는 오프닝
   카운터 0→100 후 화면이 위로 걷히며 사라짐.
   레이아웃에 있으므로 클라이언트 라우팅 간에는 다시 재생되지 않음 */
export default function OpeningProvider({ children }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame
    let timer
    const start = performance.now()
    const DURATION = 1300
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
      else timer = setTimeout(() => setDone(true), 250)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [])

  return (
    <OpeningContext.Provider value={done}>
      {children}
      <AnimatePresence>
        {!done && (
          <motion.div
            key="opening"
            className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-5 text-paper md:p-10"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="flex justify-between text-xs tracking-[0.2em] text-paper/60">
              <span>PORTFOLIO 2026</span>
              <span>HWANG HYE KYOUNG</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-display text-[22vw] font-extrabold leading-[0.8] md:text-[14vw]">
                {count}
                <span className="text-accent">%</span>
              </span>
              <span className="hidden max-w-[16rem] text-right text-sm text-paper/60 md:block">
                아이디어를 현실로 만드는 디자이너
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OpeningContext.Provider>
  )
}
