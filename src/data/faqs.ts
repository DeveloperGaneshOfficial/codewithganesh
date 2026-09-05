export type Faq = {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'What languages/tech do you teach?',
    answer: 'Mainly Python, data structures & algorithms, and backend development with FastAPI. Occasional web dev basics (HTML/CSS/JS) too.',
  },
  {
    question: 'Is the content free?',
    answer: 'Yes — all YouTube videos and blog articles are free. Some downloadable resources and future courses may be paid.',
  },
  {
    question: 'What language do you teach in?',
    answer: 'Hinglish (a mix of Hindi and English) — designed to be easy to follow for Indian developers and students.',
  },
  {
    question: 'Do I need prior coding experience?',
    answer: 'The Python for Beginners path assumes no prior experience. DSA and FastAPI paths assume basic Python knowledge.',
  },
  {
    question: 'How can I collaborate or sponsor a video?',
    answer: 'Head over to the Contact page and choose "Collaboration" or "Sponsorship" from the subject dropdown.',
  },
]
