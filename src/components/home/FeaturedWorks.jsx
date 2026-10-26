'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, categoryLabel } from '@/data/projects'

/* 작업물 무한 흐름 띠 (레퍼런스: 그르르 스튜디오 메인)
   - 화면 끝까지 꽉 찬 세로형 이미지 타일이 좁은 간격으로 왼쪽으로 계속 흐름
   - 같은 목록을 2번 이어 붙이고 -50% 까지 이동 → 끊김 없는 루프
   - 마우스를 올리면 일시정지 + 제목 노출, 누르면 프로젝트 상세 페이지로 이동
   - 두 번째 목록은 보조기기·탭 이동에서 제외 (중복 방지)
   - '동작 줄이기' 설정 시 애니메이션 대신 가로 스크롤 */
function Tile({ project, hidden }) {
  return (
    <li className="w-[48vw] shrink-0 sm:w-[28vw] lg:w-[16vw]">
      <Link
        href={`/project/${project.slug}`}
        data-cursor="VIEW"
        tabIndex={hidden ? -1 : undefined}
        className="group relative block aspect-[4/5] overflow-hidden bg-paper-2"
      >
        <Image
          src={project.cover ?? project.thumb.src}
          alt={hidden ? '' : `${project.title} 작업 이미지`}
          fill
          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 48vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05]"
        />
        {/* 호버 시 제목 */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-4 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="text-[11px] font-bold tracking-widest text-accent">{categoryLabel(project.category)}</span>
          <span className="mt-1 text-base font-extrabold md:text-lg">{project.title}</span>
        </div>
      </Link>
    </li>
  )
}

export default function FeaturedWorks() {
  return (
    <section aria-label="작업물" className="pb-24 md:pb-32">
      <div className="mx-auto mb-5 flex max-w-[1600px] items-end justify-between gap-4 px-5 md:mb-6 md:px-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-muted md:text-xs">
          ( 01 ) SELECTED WORKS <span className="text-accent">({String(PROJECTS.length).padStart(2, '0')})</span>
        </p>
        <Link href="/project" className="group flex shrink-0 items-center gap-2 text-sm font-bold">
          전체 프로젝트 보기
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>

      <div className="group/marquee overflow-hidden motion-reduce:overflow-x-auto">
        <div className="animate-marquee flex w-max group-hover/marquee:[animation-play-state:paused]" style={{ animationDuration: '45s' }}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6" aria-hidden={copy === 1 || undefined}>
              {PROJECTS.map((p) => (
                <Tile key={p.slug} project={p} hidden={copy === 1} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
