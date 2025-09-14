import { useEffect, useMemo, useState } from 'react'
import type { Article } from '../utils/storage'
import { getArticles, setArticles } from '../utils/storage'

export default function Reporter() {
  const [articles, setArticlesState] = useState<Article[]>([])
  const [filter, setFilter] = useState('')
  const [showDelete, setShowDelete] = useState<null | number>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'new' | 'list' | 'profile'>('dashboard')
  const [form, setForm] = useState<{ id?: number; title: string; category: string; imageUrl: string; content: string }>({ title: '', category: '', imageUrl: '', content: '' })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [flash, setFlash] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null })
  const [reporterName, setReporterName] = useState('Reporter')
  const [reporterEmail, setReporterEmail] = useState('')

  useEffect(() => {
    setArticlesState(getArticles())
    const name = localStorage.getItem('reporterName')
    if (name) {
      setReporterName(name)
    } else {
      localStorage.setItem('reporterName', 'John Doe')
      setReporterName('John Doe')
    }
    const email = localStorage.getItem('reporterEmail')
    if (email) setReporterEmail(email)
    // Initialize TinyMCE editor when New tab is active
    const initEditor = () => {
      // @ts-ignore
      if (window.tinymce && document.getElementById('article-content')) {
        // @ts-ignore
        window.tinymce.init({
          selector: '#article-content',
          plugins: 'link image lists table',
          toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
          height: 300
        })
      }
    }
    setTimeout(initEditor, 0)
  }, [])

  const filtered = useMemo(() => {
    const s = filter.toLowerCase()
    return articles.filter(a => a.title.toLowerCase().includes(s))
  }, [articles, filter])

  function remove(id: number) {
    const next = articles.filter(a => a.id !== id)
    setArticles(next)
    setArticlesState(next)
  }

  function openCreate() {
    setForm({ title: '', category: '', imageUrl: '', content: '' })
    setActiveTab('new')
    setTimeout(() => {
      // @ts-ignore
      if (window.tinymce) {
        // @ts-ignore
        const ed = window.tinymce.get('article-content')
        if (ed) ed.setContent('')
      }
    }, 50)
  }

  function openEdit(a: Article) {
    setForm({ id: a.id, title: a.title, category: a.category || 'General', imageUrl: a.imageUrl || '', content: a.content || '' })
    setActiveTab('new')
    setTimeout(() => {
      // @ts-ignore
      if (window.tinymce) {
        // @ts-ignore
        const ed = window.tinymce.get('article-content')
        if (ed) ed.setContent(a.content || '')
      }
    }, 50)
  }

  function saveForm(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title) return
    const editorContent = (() => {
      // @ts-ignore
      if (window.tinymce) {
        // @ts-ignore
        const ed = window.tinymce.get('article-content')
        if (ed) return ed.getContent()
      }
      return form.content
    })()
    if (form.id) {
      const next = articles.map(a => a.id === form.id ? { ...a, title: form.title, category: form.category, imageUrl: form.imageUrl, content: editorContent } : a)
      setArticles(next)
      setArticlesState(next)
      setFlash({ message: 'Article updated successfully!', type: 'success' })
    } else {
      const newArticle: Article = {
        id: Date.now(),
        title: form.title,
        reporterId: 999,
        reporterName: localStorage.getItem('reporterName') || 'Reporter',
        date: new Date().toISOString().slice(0,10),
        status: 'pending',
        category: form.category,
        imageUrl: form.imageUrl,
        content: editorContent
      }
      const next = [newArticle, ...articles]
      setArticles(next)
      setArticlesState(next)
      setFlash({ message: 'Article published successfully!', type: 'success' })
    }
    setActiveTab('list')
    // auto-hide flash
    setTimeout(() => setFlash({ message: '', type: null }), 3000)
  }

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen">
      <header className="bg-[#111827] text-white p-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <button onClick={()=>setSidebarOpen(s=>!s)} className="md:hidden mr-4 text-white"><i className="fas fa-bars"></i></button>
          <div className="flex items-center">
            <i className="fas fa-newspaper text-[#F59E0B] text-2xl mr-2"></i>
            <h1 className="font-bold text-xl">Kosmo News</h1>
          </div>
        </div>
        <button onClick={()=>{ /* future: hook real logout */ }} className="bg-[#1E3A8A] hover:bg-blue-700 text-white py-2 px-4 rounded transition-all">
          <i className="fas fa-sign-out-alt mr-2"></i>Logout
        </button>
      </header>
      <div className="flex">
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-[#111827] text-white w-64 p-4 fixed md:static top-16 left-0 z-40`}>
          <nav>
            <ul>
              <li className="mb-2"><button onClick={()=>setActiveTab('dashboard')} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='dashboard' ? 'bg-[#1E3A8A]' : ''}`}><i className="fas fa-tachometer-alt mr-3 w-6"></i><span>Dashboard</span></button></li>
              <li className="mb-2"><button onClick={openCreate} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='new' ? 'bg-[#1E3A8A]' : ''}`}><i className="fas fa-plus-circle mr-3 w-6"></i><span>Post New Article</span></button></li>
              <li className="mb-2"><button onClick={()=>setActiveTab('list')} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='list' ? 'bg-[#1E3A8A]' : ''}`}><i className="fas fa-newspaper mr-3 w-6"></i><span>My Articles</span></button></li>
              <li className="mb-2"><button onClick={()=>setActiveTab('profile')} className={`w-full text-left flex items-center p-3 rounded hover:bg-[#1E3A8A] hover:text-[#F59E0B] ${activeTab==='profile' ? 'bg-[#1E3A8A]' : ''}`}><i className="fas fa-user mr-3 w-6"></i><span>Profile</span></button></li>
            </ul>
          </nav>
          <div className="mt-4 pt-4 border-t border-gray-700 text-[#6B7280] text-sm hidden md:block">
            <p>© 2025 Kosmo News</p>
            <p>Version 1.0.0</p>
          </div>
        </aside>
        <main className="flex-grow p-6 main-content">
          {/* Flash Message */}
          {flash.type && (
            <div className={`mb-4 p-4 rounded text-white text-center ${flash.type==='success' ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}>{flash.message}</div>
          )}

          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1E3A8A]">Welcome, <span>{reporterName}</span></h2>
            <p className="text-[#6B7280]">Here's an overview of your reporter dashboard</p>
          </div>
          {activeTab==='dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#1E3A8A]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Total Articles</h3>
                <i className="fas fa-newspaper text-2xl text-[#1E3A8A]"></i>
              </div>
              <p className="text-3xl font-bold mt-2">{articles.length}</p>
              <p className="text-[#6B7280] mt-1">Articles published</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#F59E0B]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Most Popular</h3>
                <i className="fas fa-star text-2xl text-[#F59E0B]"></i>
              </div>
              <p className="text-xl font-bold mt-2 truncate">{articles[0]?.title || 'No articles yet'}</p>
              <p className="text-[#6B7280] mt-1">Highest engagement</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#10B981]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <i className="fas fa-chart-line text-2xl text-[#10B981]"></i>
              </div>
              <p className="text-xl font-bold mt-2">{articles.length ? new Date(articles[0].date).toLocaleDateString() : 'No recent activity'}</p>
              <p className="text-[#6B7280] mt-1">Last 7 days</p>
            </div>
          </div>
          )}

          {activeTab==='list' && (
          <div>
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-4">My Articles</h3>
            <div className="mb-4">
              <div className="flex gap-2 items-center">
                <input value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder="Search by title..." className="w-full max-w-sm p-2 border border-gray-300 rounded" />
                <button onClick={openCreate} className="bg-[#1E3A8A] text-white py-2 px-4 rounded">Create New</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.length === 0 ? (
                <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">No articles yet.</div>
              ) : filtered.map(a => (
                <div key={a.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${a.id}/600/400`} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{a.title}</h4>
                      <span className="bg-[#F59E0B] text-white text-xs px-2 py-1 rounded-full">{a.status}</span>
                    </div>
                    <div className="text-[#6B7280] mb-3">By {a.reporterName} — {a.date}</div>
                    <div className="flex justify-between">
                      <button onClick={()=>openEdit(a)} className="bg-[#F59E0B] text-white py-1 px-3 rounded text-sm">Edit</button>
                      <button onClick={()=>setShowDelete(a.id)} className="bg-[#EF4444] text-white py-1 px-3 rounded text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {activeTab==='new' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-3xl">
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-4">{form.id ? 'Edit Article' : 'Post New Article'}</h3>
            <form onSubmit={saveForm} className="space-y-4">
              <div>
                <label className="block text-[#6B7280] mb-2">Title</label>
                <input value={form.title} onChange={(e)=>setForm(f=>({ ...f, title: e.target.value }))} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter article title" required />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Category</label>
                <select value={form.category} onChange={(e)=>setForm(f=>({ ...f, category: e.target.value }))} className="w-full p-2 border border-gray-300 rounded" required>
                  <option value="">Select a category</option>
                  <option value="Politics">Politics</option>
                  <option value="Sports">Sports</option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Image URL</label>
                <input value={form.imageUrl} onChange={(e)=>setForm(f=>({ ...f, imageUrl: e.target.value }))} className="w-full p-2 border border-gray-300 rounded" placeholder="Enter image URL" />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Content</label>
                <textarea id="article-content" rows={10} className="w-full p-2 border border-gray-300 rounded" placeholder="Write your article content here" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={()=>setActiveTab('list')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">Cancel</button>
                <button type="submit" className="bg-[#1E3A8A] hover:bg-blue-700 text-white py-2 px-4 rounded">{form.id ? 'Save Changes' : 'Publish Article'}</button>
              </div>
            </form>
          </div>
          )}

          {activeTab==='profile' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-xl">
            <h3 className="text-xl font-bold text-[#1E3A8A] mb-4">Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#6B7280] mb-2">Name</label>
                <input value={reporterName} onChange={(e)=>setReporterName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-[#6B7280] mb-2">Email</label>
                <input value={reporterEmail} onChange={(e)=>setReporterEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={()=>{ localStorage.setItem('reporterName', reporterName); localStorage.setItem('reporterEmail', reporterEmail); setFlash({ message: 'Profile saved', type: 'success' }); setTimeout(()=>setFlash({ message:'', type:null}), 3000) }} className="bg-[#1E3A8A] text-white py-2 px-4 rounded">Save</button>
              </div>
            </div>
          </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this article? This action cannot be undone.</p>
            <div className="flex justify-end mt-6">
              <button onClick={()=>setShowDelete(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2">Cancel</button>
              <button onClick={()=>{ remove(showDelete); setShowDelete(null) }} className="bg-[#EF4444] hover:bg-red-600 text-white py-2 px-4 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* no extra floating buttons as per original HTML */}
    </div>
  )
}


