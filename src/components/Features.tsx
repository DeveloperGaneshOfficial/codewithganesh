// File: src/components/Features.tsx
import '../app/globals.css';

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-tech-dark transition-theme">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
            <span className="text-primary font-medium text-sm">What You&apos;ll Learn</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Master In-Demand Skills</h2>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            CodeSpire offers comprehensive tutorials across multiple programming domains to help you build a successful career in tech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureData.map((feature, i) => (
            <div key={i} className="bg-white dark:bg-tech-dark rounded-2xl shadow-lg p-8 transition-theme border border-slate-100 dark:border-slate-700 hover:shadow-xl">
              <div className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-200 mb-6">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-medium text-slate-700 dark:text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Code, Database, BrainCircuit } from 'lucide-react'


const featureData = [
  {
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript, React, and more with hands-on projects and real-world applications.",
    tags: ["HTML5", "CSS3", "JavaScript", "React"],
    icon: Code,
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    title: "Backend & Databases",
    description: "Learn server-side programming with Node.js, Python, and database management with SQL and NoSQL.",
    tags: ["Node.js", "Python", "MongoDB", "SQL"],
    icon: Database,
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    title: "AI & Machine Learning",
    description: "Explore artificial intelligence concepts, machine learning algorithms, and practical applications.",
    tags: ["TensorFlow", "PyTorch", "Data Science", "NLP"],
    icon: BrainCircuit,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
  },
]
