'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const FINE = '(pointer: fine)'
const isFinePointer = () => window.matchMedia(FINE).matches
const subscribeFinePointer = (cb) => {
  const mq = window.matchMedia(FINE)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

/* 커스텀 커서
   - 마우스(정밀 포인터) 환경에서만 동작
   - data-cursor="라벨" 요소 위에서 원이 커지며 라벨 표시
   - a / button 위에서는 살짝 확대 */
export default function CustomCursor() {
  const enabled = useSyncExternalStore(subscribeFinePointer, isFinePointer, () => false)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.4 })
  const y = useSpring(my, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
      const target = e.target.closest?.('[data-cursor], a, button')
      setLabel(target?.dataset?.cursor ?? '')
      setHovering(!!target)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, mx, my])

  if (!enabled) return null

  const size = label ? 96 : hovering ? 44 : 14

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-accent text-[11px] font-bold tracking-widest text-white"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, opacity: visible ? (hovering && !label ? 0.35 : 1) : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <AnimatePresence>
        {label && (
          <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
