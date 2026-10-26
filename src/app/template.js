'use client'

import { motion } from 'framer-motion'

/* 페이지 전환 — 라우트가 바뀔 때마다 새로 마운트되어 페이드업 */
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
