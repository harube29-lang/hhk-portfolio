'use client'

import Image from 'next/image'
import Link from 'next/link'
import { categoryLabel } from '@/data/projects'

/* 프로젝트 카드
   - 호버: 이미지 확대 + 하단 패널(서브타이틀 · 태그) 슬라이드업
   - 터치 기기에서도 정보가 보이도록 제목/카테고리는 카드 아래 항상 노출
   - 클릭 시 href(프로젝트 상세 페이지)로 이동 */
export default function ProjectCard({ project, href, aspect = 'aspect-[4/3]', sizes, priority, ...rest }) {
  const contain = project.thumbFit === 'contain'

  const body = (
    <>
      <div className={`relative overflow-hidden rounded-xl bg-paper-2 md:rounded-2xl ${aspect}`} style={contain ? { background: project.tone } : undefined}>
        <Image
          src={project.thumb.src}
          alt={`${project.title} 썸네일`}
          fill
          sizes={sizes ?? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          priority={priority}
          className={`transition-transform duration-[900ms] ease-out-expo md:group-hover:scale-[1.06] ${
            contain ? 'object-contain p-[8%]' : 'object-cover'
          }`}
        />

        {/* 호버 패널 */}
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-[calc(100%+1rem)] rounded-xl bg-paper/90 p-4 backdrop-blur-md transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0 md:block">
          <p className="text-sm font-semibold">{project.subtitle}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <span className="absolute left-2 top-2 rounded-full bg-ink px-2 py-0.5 text-[9px] font-bold tracking-wider text-paper md:left-3 md:top-3 md:px-3 md:py-1 md:text-[11px]">
          {categoryLabel(project.category)}
        </span>
      </div>

      <div className="mt-2.5 flex items-baseline justify-between gap-4 md:mt-4">
        <h3 className="text-sm font-bold md:text-xl">
          {project.title}
          <span className="ml-2 hidden font-display text-sm font-semibold tracking-wide text-muted md:inline">{project.titleEn}</span>
        </h3>
        <span className="hidden shrink-0 text-xs text-muted sm:inline">{project.badge}</span>
      </div>
    </>
  )

  return (
    <Link href={href} className="group block w-full text-left outline-none" data-cursor="VIEW" {...rest}>
      {body}
    </Link>
  )
}
