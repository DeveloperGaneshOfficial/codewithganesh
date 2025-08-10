import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-theme">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Create an Account</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Mobile Number</label>
            <input type="tel" pattern="[0-9]{10}" maxLength={10} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-theme shadow-md hover:shadow-lg">Register</button>
        </form>
        <p className="mt-6 text-center text-slate-600 dark:text-slate-400 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:text-primary-dark font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
}
