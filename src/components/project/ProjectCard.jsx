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
      <div className={`relative overflow-hidden rounded-2xl bg-paper-2 ${aspect}`} style={contain ? { background: project.tone } : undefined}>
        <Image
          src={project.thumb.src}
          alt={`${project.title} 썸네일`}
          fill
          sizes={sizes ?? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          priority={priority}
          className={`transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.06] ${
            contain ? 'object-contain p-[8%]' : 'object-cover'
          }`}
        />

        {/* 호버 패널 */}
        <div className="absolute inset-x-3 bottom-3 translate-y-[calc(100%+1rem)] rounded-xl bg-paper/90 p-4 backdrop-blur-md transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <p className="text-sm font-semibold">{project.subtitle}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-bold tracking-wider text-paper">
          {categoryLabel(project.category)}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-bold md:text-xl">
          {project.title}
          <span className="ml-2 font-display text-sm font-semibold tracking-wide text-muted">{project.titleEn}</span>
        </h3>
        <span className="shrink-0 text-xs text-muted">{project.badge}</span>
      </div>
    </>
  )

  return (
    <Link href={href} className="group block w-full text-left outline-none" data-cursor="VIEW" {...rest}>
      {body}
    </Link>
  )
}
