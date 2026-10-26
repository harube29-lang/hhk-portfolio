import { notFound } from 'next/navigation'
import { PROJECTS } from '@/data/projects'
import ProjectDetail from '@/components/project/ProjectDetail'

/* 정적 내보내기: 빌드 시 프로젝트별 상세 페이지를 미리 생성 */
export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.slug === slug)
  return project ? { title: `${project.title} — 황혜경`, description: project.description } : {}
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return <ProjectDetail project={PROJECTS[index]} prev={prev} next={next} />
}
