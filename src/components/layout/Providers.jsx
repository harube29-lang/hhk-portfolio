'use client'

import { MotionConfig } from 'framer-motion'
import OpeningProvider from './Opening'
import CustomCursor from './CustomCursor'

/* 전역 클라이언트 래퍼
   - reducedMotion="user" : OS의 '동작 줄이기' 설정 시 애니메이션 최소화 */
export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <OpeningProvider>
        {children}
        <CustomCursor />
      </OpeningProvider>
    </MotionConfig>
  )
}
