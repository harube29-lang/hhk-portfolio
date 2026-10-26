import { asset } from '@/lib/asset'

/* ════════════════════════════════════════
   프로젝트 데이터
   - category 는 CATEGORIES 의 id 중 하나
   - images : 상세 모달에 순서대로 노출 (w/h 는 원본 픽셀 크기)
   - featured : HOME 갤러리에 노출
   - thumbFit : 'contain' 이면 썸네일을 잘라내지 않고 tone 배경 위에 배치
════════════════════════════════════════ */
export const CATEGORIES = [
  { id: 'ALL', label: 'ALL' },
  { id: 'WEB', label: 'WEB DESIGN' },
  { id: 'MOBILE', label: 'MOBILE DESIGN' },
  { id: 'CARDNEWS', label: 'CARD NEWS DESIGN' },
  { id: 'VIBE', label: 'VIBE CODING' },
]

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id

export const PROJECTS = [
  {
    slug: 'archive-coffee',
    title: '아카이브 커피',
    titleEn: 'ARCHIVE COFFEE',
    category: 'WEB',
    badge: '자체제작',
    subtitle: '원두 구매 · 납품 · 컨설팅을 한 흐름으로',
    description:
      '원두 구매 및 납품 신청, 맞춤 컨설팅 문의 과정을 직관적인 동선으로 구현한 커피 비즈니스 사이트를 자체 제작했습니다.',
    tags: ['Branding', 'Landing', 'Figma'],
    thumb: { src: asset('/images/thumb_archive.webp'), w: 1920, h: 1440 },
    images: [
      { src: asset('/images/detail_archive.webp'), w: 1440, h: 4000, label: '작업 내용' },
      { src: asset('/images/landing_archive.webp'), w: 1920, h: 5825, label: '랜딩 페이지' },
      { src: asset('/images/detailpage_archive.webp'), w: 1920, h: 5300, label: '상세 페이지' },
    ],
    featured: true,
  },
  {
    slug: 'paris-croissant',
    title: '파리크라상',
    titleEn: 'PARIS CROISSANT',
    category: 'WEB',
    badge: '리디자인',
    subtitle: '브랜드 컬러는 지키고, 경험은 2026년답게',
    description:
      '업데이트가 오래되지 않았던 파리크라상 웹사이트를 2026년 트렌드에 맞춰 리디자인했습니다. 브랜드 컬러는 유지하고, 여백과 카드 UI를 재구성하여 보다 깔끔하고 직관적인 사용자 경험을 제공하도록 개선했습니다.',
    tags: ['Redesign', 'E-commerce', 'Card UI'],
    thumb: { src: asset('/images/thumb_paris.webp'), w: 1920, h: 1440 },
    images: [
      { src: asset('/images/detail_paris.webp'), w: 1440, h: 4405, label: '작업 내용' },
      { src: asset('/images/work_paris_home.webp'), w: 1920, h: 3912, label: '홈' },
      { src: asset('/images/work_paris_product.webp'), w: 1920, h: 5130, label: '상품 안내' },
      { src: asset('/images/work_paris_order.webp'), w: 1920, h: 3227, label: '온라인 주문' },
      { src: asset('/images/work_paris_community.webp'), w: 1920, h: 2965, label: '커뮤니티' },
    ],
    siteUrl: 'https://pariscroissantorder.com/',
    featured: true,
  },
  {
    slug: 'natuur',
    title: '나뚜루',
    titleEn: 'NATUUR',
    category: 'WEB',
    badge: '리디자인',
    subtitle: '스토어에서 브랜드 스토리로',
    description:
      '스토어 중심 판매 구조에서 벗어나 브랜드 스토리를 전달하고자 여백과 자연 친화적 감성을 담은 웹사이트를 새롭게 기획했습니다. 기존의 올드한 디자인을 개선하고 따뜻하고 여유로운 레이아웃을 적용해 편안한 사용자 경험을 제공합니다.',
    tags: ['Redesign', 'Brand Story', 'Layout'],
    thumb: { src: asset('/images/thumb_natuur.webp'), w: 1920, h: 1440 },
    images: [
      { src: asset('/images/detail_natuur.webp'), w: 1440, h: 4485, label: '작업 내용' },
      { src: asset('/images/landing_natuur.webp'), w: 1920, h: 4900, label: '랜딩 페이지' },
      { src: asset('/images/detailpage_natuur.webp'), w: 1920, h: 4384, label: '상세 페이지' },
    ],
  },
  {
    slug: 'uuh',
    title: '울산대학교병원',
    titleEn: 'ULSAN UNIV. HOSPITAL',
    category: 'WEB',
    badge: '리디자인',
    subtitle: '복잡한 절차 없이, 빠르게 진료까지',
    description:
      '지역 유일 상급종합병원의 전문성과 첨단 의료 기술을 사용자 중심의 간결하고 정돈된 인터페이스로 재구성한 웹 리디자인 프로젝트입니다. 환자들이 복잡한 절차 없이 빠르게 진료 정보와 예약 시스템을 이용할 수 있도록 UX/UI를 개선했습니다.',
    tags: ['Redesign', 'Universal Design', 'UX'],
    thumb: { src: asset('/images/thumb_hospital.webp'), w: 1920, h: 1440 },
    images: [
      { src: asset('/images/detail_hospital.webp'), w: 1440, h: 4913, label: '작업 내용' },
      { src: asset('/images/work_hospital_home.webp'), w: 1920, h: 5000, label: '메인 페이지' },
    ],
    siteUrl: 'https://www.uuh.ulsan.kr/kr/',
  },
  {
    slug: 'arvee',
    title: '아르베',
    titleEn: 'ARVÉE',
    category: 'MOBILE',
    badge: '자체제작',
    subtitle: '전시 · 팝업 정보를 한눈에 탐색하는 앱',
    description:
      '전시·팝업 정보를 한눈에 탐색할 수 있는 모바일 앱 UI를 기획하고 디자인했습니다. 감성적인 이미지 중심의 배너와 카드형 리스트 구성으로, 사용자가 원하는 전시·팝업 정보를 직관적으로 찾을 수 있도록 설계했습니다.',
    tags: ['App UI', 'Card List', 'Figma'],
    thumb: { src: asset('/images/thumb_arvee.webp'), w: 342, h: 458 },
    thumbFit: 'contain',
    tone: '#d9d3c7',
    images: [{ src: asset('/images/detail_arvee.webp'), w: 845, h: 4165, label: '작업 내용' }],
    featured: true,
  },
  {
    slug: 'ott',
    title: '넷플릭스st OTT',
    titleEn: 'OTT LANDING',
    category: 'VIBE',
    badge: '자체제작',
    subtitle: 'AI와 함께 기획부터 배포까지',
    description:
      '넷플릭스를 벤치마킹해 OTT 콘텐츠 소개 랜딩페이지를 직접 기획하고 제작했습니다. 다크 테마 기반의 몰입감 있는 히어로 배너와 카테고리별 콘텐츠 탐색 구조로, 실제 OTT 서비스와 가까운 사용자 경험을 구현하는 데 집중했습니다.',
    tags: ['React', 'Dark UI', 'Vibe Coding'],
    thumb: { src: asset('/images/thumb_netflix.webp'), w: 1023, h: 675 },
    images: [],
    siteUrl: 'https://harube29-lang.github.io/home-ott/',
  },
]
