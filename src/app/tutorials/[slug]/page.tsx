import { notFound } from "next/navigation"
import { findTutorialById, tutorials } from "@/data/tutorials"
import TutorialClient from "./tutorial-client"

export async function generateStaticParams() {
  return tutorials.map((tutorial) => ({ slug: tutorial.id }))
}

type TutorialPageProps = {
  params: { slug: string }
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = findTutorialById(params.slug)

  if (!tutorial) {
    notFound()
  }

  return <TutorialClient tutorial={tutorial} />
}
