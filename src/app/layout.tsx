import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata = {
  title: 'CodeWithGanesh - Learn Coding with CodeSpire',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.className} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function() {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          })();`}
        </Script>
      </head>
      <body className="antialiased bg-white text-slate-800 transition-theme dark:bg-tech-dark dark:text-slate-200">
        <Header />
        <div className="relative isolate">
          <div className="pointer-events-none absolute inset-0 -z-10 blueprint-pattern dark:hidden" aria-hidden="true" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}
