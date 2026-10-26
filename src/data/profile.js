import { asset } from '@/lib/asset'

/* ════════════════════════════════════════
   개인 정보 · 연락처
   - linkedin 처럼 값이 빈 링크는 화면에 표시되지 않습니다.
════════════════════════════════════════ */
export const PROFILE = {
  name: '황혜경',
  nameEn: 'HWANG HYEKYUNG',
  role: 'Web & Mobile · UX/UI · Card News Designer',
  major: '동명대학교 산업디자인전공',
  slogan: '아이디어를 현실로 만드는 디자이너',
  photo: asset('/images/profile.webp'),
}

export const CONTACT = {
  email: 'harube29@naver.com',
  phone: '010-4491-0523',
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: '' },
    { label: 'GitHub', href: 'https://github.com/harube29-lang' },
  ],
}

export const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT ME', href: '/about' },
  { label: 'PROJECT', href: '/project' },
]

/* ── ABOUT: 주요 역량 ── */
export const SKILLS = [
  { no: '01', name: 'Figma', desc: '오토레이아웃·컴포넌트·배리언트 기반의 체계적인 화면 설계와 프로토타이핑' },
  { no: '02', name: 'Web Design', desc: '브랜드 성격을 읽어낸 톤앤매너, 여백과 그리드 중심의 반응형 웹 레이아웃' },
  { no: '03', name: 'UX/UI', desc: '사용자 흐름 분석, 정보 구조 재정리, 누구나 헤매지 않는 인터페이스 설계' },
  { no: '04', name: 'Card News Layout', desc: '한 장 안에서 핵심이 읽히는 정보 위계와 시리즈형 콘텐츠 레이아웃' },
]

export const TOOLS = ['Figma', 'Photoshop', 'Illustrator', 'HTML/CSS', 'React', 'AI Vibe Coding']

/* ── ABOUT: 경력 · 활동 타임라인 ── */
export const TIMELINE = [
  { year: '2026', title: 'UX/UI · 웹디자인 개인 프로젝트', desc: '웹 디자인 4건, 모바일 앱 UI 1건, AI 바이브 코딩 1건 진행' },
  { year: '2015', title: 'D2B 디자인페어 홍보 서포터즈', desc: '3개월간 디자인 페어 홍보 활동' },
  { year: '2014', title: 'D2B 디자인페어 공모전 입선', desc: '' },
  { year: '2013', title: 'D2B 디자인페어 공모전 입선', desc: '' },
  { year: 'EDU', title: '동명대학교 산업디자인전공', desc: '제품 형태·사용성 중심의 디자인 프로세스 학습' },
]
