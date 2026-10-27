import { asset } from '@/lib/asset'

/* ════════════════════════════════════════
   개인 정보 · 연락처
════════════════════════════════════════ */
export const PROFILE = {
  name: '황혜경',
  nameEn: 'HWANG HYE KYOUNG',
  role: 'Web & Mobile · UX/UI · Card News Designer',
  major: '동명대학교 산업디자인전공',
  experience: '신입',
  position: 'UX/UI · 디지털 콘텐츠 디자이너',
  slogan: '아이디어를 현실로 만드는 디자이너',
  photo: asset('/images/profile.webp'),
}

export const CONTACT = {
  email: 'harube29@naver.com',
  phone: '010-4491-0523',
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

/* ── ABOUT: 툴 · 기술 스택 (level: 숙련도 %) ── */
export const TOOL_GROUPS = [
  {
    group: 'Design',
    items: [
      { name: 'Figma', level: 75, desc: 'UI/UX 디자인 및 프로토타이핑' },
      { name: 'Photoshop', level: 75, desc: '이미지 보정 및 그래픽 편집' },
      { name: 'Illustrator', level: 75, desc: '벡터 그래픽 및 아이콘 제작' },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'HTML', level: 65, desc: '웹 페이지 구조 마크업' },
      { name: 'CSS', level: 65, desc: '스타일링과 반응형 레이아웃' },
      { name: 'React', level: 40, desc: '컴포넌트 기반 화면 구현' },
      { name: 'JavaScript', level: 35, desc: '동적 인터랙션 구현' },
    ],
  },
]

/* ── ABOUT: 경력 · 활동 타임라인 ── */
export const TIMELINE = [
  { year: 'EDU', title: '동명대학교 산업디자인전공', desc: '제품 형태·사용성 중심의 디자인 프로세스 학습' },
  { year: '2013', title: 'D2B 디자인페어 공모전 입선', desc: '' },
  { year: '2014', title: 'D2B 디자인페어 공모전 입선', desc: '' },
  { year: '2015', title: 'D2B 디자인페어 홍보 서포터즈', desc: '3개월간 디자인 페어 홍보 활동' },
]

/* ── ABOUT: 학력 · 교육 (사진 아래) ── */
export const EDUCATION = [
  { title: '동명대학교 산업디자인전공', period: '2012.03 – 2016.02' },
  { title: 'SBS아카데미 웹디자인 개발 양성과정 수료', period: '2026.02 – 2026.07' },
]
