import { useState } from 'react'

export default function Login() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center px-4 pt-4">
          <a href="#/news" className="text-sm text-[#1E3A8A]">News</a>
          <div className="space-x-3">
            <a href="#/reporter" className="text-sm text-[#1E3A8A]">Reporter</a>
            <a href="#/admin" className="text-sm text-[#1E3A8A]">Admin</a>
          </div>
        </div>
        <div className="flex justify-center items-center p-6 bg-[#111827] text-white">
          <i className="fas fa-newspaper text-[#F59E0B] text-3xl mr-3"></i>
          <h1 className="font-bold text-2xl">NewsHub</h1>
        </div>
        <div className="flex border-b border-gray-200">
          <button onClick={() => setTab('login')} className={`flex-1 py-4 text-center border-b-4 transition-all ${tab==='login' ? 'border-[#1E3A8A] text-[#1E3A8A] font-medium' : 'text-[#6B7280]'}`}>Login</button>
          <button onClick={() => setTab('register')} className={`flex-1 py-4 text-center border-b-4 transition-all ${tab==='register' ? 'border-[#F59E0B] text-[#F59E0B] font-medium' : 'text-[#6B7280]'}`}>Register</button>
        </div>
        <div className="p-6">
          {tab === 'login' ? (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); localStorage.setItem('reporterName', 'Reporter'); window.location.hash = '#/reporter' }}>
              <div>
                <label className="block text-[#6B7280] mb-2">Email or Username</label>
                <input className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <button className="w-full py-2 bg-[#1E3A8A] text-white rounded">Login</button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setTab('login') }}>
              <div>
                <label className="block text-[#6B7280] mb-2">Full Name</label>
                <input className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Username</label>
                <input className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Confirm Password</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <button className="w-full py-2 bg-[#F59E0B] text-white rounded">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}


