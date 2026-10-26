'use client'

import { createContext, useContext } from 'react'

/* 등장 애니메이션 재생 시점 공유
   - 오프닝(0→100% 인트로 화면)은 제거됨 → 항상 true 라서 히어로 등장 애니메이션이 바로 재생
   - 다시 인트로를 넣고 싶으면 여기서 종료 시점에 true 로 바꿔 주면 됨 */
const OpeningContext = createContext(true)
export const useOpeningDone = () => useContext(OpeningContext)

export default function OpeningProvider({ children }) {
  return <OpeningContext.Provider value={true}>{children}</OpeningContext.Provider>
}
