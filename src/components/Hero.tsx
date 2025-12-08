export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-slate-100 dark:from-tech-dark dark:to-tech-dark transition-theme">
      <div className="absolute inset-0 blueprint-pattern" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-28 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Learn to <span className="text-primary">Code</span> with Ganesh
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-200 mb-8 max-w-xl mx-auto md:mx-0">
              Master programming with clear, practical tutorials that take you from beginner to professional developer.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a href="https://youtube.com" target="_blank" className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg transition-theme text-lg shadow-md hover:shadow-lg flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
                Subscribe on YouTube
              </a>
              <a href="#videos" className="bg-white dark:bg-tech-dark hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium py-3 px-8 rounded-lg transition-theme text-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md">
                Browse Videos
              </a>
            </div>
          </div>

          {/* Responsive hero image and background effects */}
          <div className="hidden md:block relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-tech-blue-light/20 dark:bg-tech-blue-light/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative bg-white dark:bg-tech-dark rounded-2xl shadow-xl p-4 border border-slate-200 dark:border-slate-700 glow">
              <div className="flex items-center border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="mx-auto text-sm font-mono text-slate-500 dark:text-slate-400">index.js</div>
              </div>
              <div className="font-mono text-sm">
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">1</div>
                  <div><span className="text-purple-600 dark:text-purple-400">function</span> <span className="text-yellow-600 dark:text-yellow-300">codeWithGanesh</span><span className="text-slate-600 dark:text-slate-300">()</span> <span className="text-slate-600 dark:text-slate-300">{`{`}</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">2</div>
                  <div className="pl-4"><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">skills</span> <span className="text-slate-600 dark:text-slate-300">=</span> <span className="text-slate-600 dark:text-slate-300">[</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">3</div>
                  <div className="pl-8"><span className="text-green-600 dark:text-green-400">&apos;JavaScript&apos;</span><span className="text-slate-600 dark:text-slate-300">,</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">4</div>
                  <div className="pl-8"><span className="text-green-600 dark:text-green-400">&apos;React&apos;</span><span className="text-slate-600 dark:text-slate-300">,</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">5</div>
                  <div className="pl-8"><span className="text-green-600 dark:text-green-400">&apos;Node.js&apos;</span><span className="text-slate-600 dark:text-slate-300">,</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">6</div>
                  <div className="pl-8"><span className="text-green-600 dark:text-green-400">&apos;Python&apos;</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">7</div>
                  <div className="pl-4"><span className="text-slate-600 dark:text-slate-300">];</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">8</div>
                  <div className="pl-4"></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">9</div>
                  <div className="pl-4"><span className="text-purple-600 dark:text-purple-400">return</span> <span className="text-slate-600 dark:text-slate-300">{'{'}</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">10</div>
                  <div className="pl-8"><span className="text-blue-600 dark:text-blue-400">learn</span><span className="text-slate-600 dark:text-slate-300">:</span> <span className="text-green-600 dark:text-green-400">&apos;Coding Made Simple&apos;</span><span className="text-slate-600 dark:text-slate-300">,</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">11</div>
                  <div className="pl-8"><span className="text-blue-600 dark:text-blue-400">skills</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">12</div>
                  <div className="pl-4"><span className="text-slate-600 dark:text-slate-300">{' };'}</span></div>
                </div>
                <div className="flex">
                  <div className="text-slate-400 dark:text-slate-500 mr-4 select-none">13</div>
                  <div><span className="text-slate-600 dark:text-slate-300">{'}'}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-current text-white dark:text-slate-900 transition-theme">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,85.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
    </section>
  )
}
