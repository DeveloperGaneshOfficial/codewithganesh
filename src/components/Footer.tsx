// File: src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-8 dark:border-slate-700 dark:bg-tech-dark">
      <div className="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-200 sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} CodeWithGanesh. All rights reserved.
      </div>
    </footer>
  )
}
