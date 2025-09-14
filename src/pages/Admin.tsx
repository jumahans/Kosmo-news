import { useEffect, useMemo, useState } from 'react'
import type { Article, Reporter } from '../utils/storage'
import { getArticles, getReporters, getSubscribers, seedIfNeeded, setArticles, setReporters } from '../utils/storage'

export default function Admin() {
  const [articles, setArticlesState] = useState<Article[]>([])
  const [reporters, setReportersState] = useState<Reporter[]>([])
  const [subscribers, setSubscribersState] = useState<number>(0)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'pending' | 'approved'>('all')
  const [page, setPage] = useState(1)
  const perPage = 5
  const [rPage, setRPage] = useState(1)
  const rPerPage = 5
  const [rSearch, setRSearch] = useState('')

  // Edit Reporter modal
  const [showEdit, setShowEdit] = useState(false)
  const [editReporter, setEditReporter] = useState<Reporter | null>(null)

  // Confirm modal (reusable)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null)

  // Edit Article modal
  const [showArticleEdit, setShowArticleEdit] = useState(false)
  const [editArticle, setEditArticle] = useState<Article | null>(null)

  useEffect(() => {
    seedIfNeeded()
    setArticlesState(getArticles())
    setReportersState(getReporters())
    setSubscribersState(getSubscribers())
  }, [])

  const filtered = useMemo(() => {
    let rows = articles
    if (status !== 'all') rows = rows.filter(a => a.status === status)
    if (search) {
      const s = search.toLowerCase()
      rows = rows.filter(a => a.title.toLowerCase().includes(s) || a.reporterName.toLowerCase().includes(s))
    }
    return rows
  }, [articles, search, status])

  const total = filtered.length
  const start = (page - 1) * perPage
  const end = Math.min(start + perPage, total)
  const pageRows = filtered.slice(start, end)

  function approve(id: number) {
    const next = articles.map(a => a.id === id ? { ...a, status: 'approved' } : a)
    setArticles(next)
    setArticlesState(next)
  }

  function removeArticle(id: number) {
    setConfirmMsg('Are you sure you want to delete this article?')
    setOnConfirm(() => () => {
      const next = articles.filter(a => a.id !== id)
      setArticles(next)
      setArticlesState(next)
      setConfirmOpen(false)
    })
    setConfirmOpen(true)
  }

  function openEditArticle(id: number) {
    const a = articles.find(x => x.id === id) || null
    setEditArticle(a)
    setShowArticleEdit(true)
  }

  function saveArticle(updated: Article) {
    const next = articles.map(a => a.id === updated.id ? updated : a)
    setArticles(next)
    setArticlesState(next)
    setShowArticleEdit(false)
    setEditArticle(null)
  }

  // Reporters table data
  const reportersFiltered = useMemo(() => {
    let rows = reporters
    if (rSearch) {
      const s = rSearch.toLowerCase()
      rows = rows.filter(r => r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s))
    }
    return rows
  }, [reporters, rSearch])

  const rTotal = reportersFiltered.length
  const rStart = (rPage - 1) * rPerPage
  const rEnd = Math.min(rStart + rPerPage, rTotal)
  const rRows = reportersFiltered.slice(rStart, rEnd)

  function openEditReporter(id: number) {
    const r = reporters.find(x => x.id === id) || null
    setEditReporter(r)
    setShowEdit(true)
  }

  function saveReporter(updated: Reporter) {
    const nextReporters = reporters.map(r => r.id === updated.id ? updated : r)
    setReporters(nextReporters)
    setReportersState(nextReporters)
    // propagate name change to articles
    const nextArticles = articles.map(a => a.reporterId === updated.id ? { ...a, reporterName: updated.name } : a)
    setArticles(nextArticles)
    setArticlesState(nextArticles)
    setShowEdit(false)
    setEditReporter(null)
  }

  function removeReporter(id: number) {
    const r = reporters.find(x => x.id === id)
    setConfirmMsg(`Are you sure you want to remove "${r?.name || ''}"? All associated articles will also be removed.`)
    setOnConfirm(() => () => {
      const nextReporters = reporters.filter(x => x.id !== id)
      setReporters(nextReporters)
      setReportersState(nextReporters)
      const nextArticles = articles.filter(a => a.reporterId !== id)
      setArticles(nextArticles)
      setArticlesState(nextArticles)
      setConfirmOpen(false)
    })
    setConfirmOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[#111827] text-white p-4 shadow-md z-10 flex justify-between items-center">
        <div className="flex items-center">
          <button className="md:hidden mr-4 text-white"><i className="fas fa-bars text-xl"></i></button>
          <div className="flex items-center">
            <i className="fas fa-newspaper text-[#F59E0B] text-2xl mr-2"></i>
            <span className="text-xl font-bold">Kosmo News</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="#/news" className="px-3 py-2 rounded hover:bg-[#1E3A8A]">News</a>
          <a href="#/reporter" className="px-3 py-2 rounded hover:bg-[#1E3A8A]">Reporter</a>
          <a href="#/login" className="bg-[#1E3A8A] hover:bg-blue-800 text-white py-2 px-4 rounded-md">Logout</a>
        </div>
      </nav>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#1E3A8A] mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6"><h3 className="text-[#6B7280] text-sm uppercase">Total Reporters</h3><p className="text-2xl font-bold">{reporters.length}</p></div>
          <div className="bg-white rounded-lg shadow-md p-6"><h3 className="text-[#6B7280] text-sm uppercase">Total Articles</h3><p className="text-2xl font-bold">{articles.length}</p></div>
          <div className="bg-white rounded-lg shadow-md p-6"><h3 className="text-[#6B7280] text-sm uppercase">Total Subscribers</h3><p className="text-2xl font-bold">{subscribers}</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 md:mb-0">Recent Articles</h2>
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative flex-grow md:flex-grow-0">
                <input value={search} onChange={(e)=>{setPage(1); setSearch(e.target.value)}} type="text" placeholder="Search articles..." className="w-full rounded-md border border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <select value={status} onChange={(e)=>{setPage(1); setStatus(e.target.value as any)}} className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b">Title</th>
                  <th className="text-left p-3 border-b">Reporter</th>
                  <th className="text-left p-3 border-b">Date</th>
                  <th className="text-left p-3 border-b">Status</th>
                  <th className="text-left p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.length === 0 ? (
                  <tr><td className="text-center p-4 text-gray-500" colSpan={5}>No articles found</td></tr>
                ) : pageRows.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{a.title}</td>
                    <td className="p-3">{a.reporterName}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${a.status==='approved' ? 'bg-[#10B981] text-white' : 'bg-gray-200 text-gray-700'}`}>{a.status[0].toUpperCase()+a.status.slice(1)}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {a.status==='pending' && <button onClick={()=>approve(a.id)} className="px-3 py-1 rounded bg-[#10B981] text-white">Approve</button>}
                        <button onClick={()=>openEditArticle(a.id)} className="px-3 py-1 rounded bg-[#1E3A8A] text-white">Edit</button>
                        <button onClick={()=>removeArticle(a.id)} className="px-3 py-1 rounded bg-[#EF4444] text-white">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="text-gray-600 text-sm mb-2 md:mb-0">Showing {total ? `${start+1}-${end}`:'0-0'} of {total} articles</div>
            <div className="flex gap-2">
              <button disabled={page===1} onClick={()=>setPage((p)=>Math.max(1,p-1))} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>
              <button disabled={end>=total} onClick={()=>setPage((p)=>p+1)} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
        {/* Reporters Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 md:mb-0">Reporters</h2>
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative flex-grow md:flex-grow-0">
                <input value={rSearch} onChange={(e)=>{setRPage(1); setRSearch(e.target.value)}} type="text" placeholder="Search reporters..." className="w-full rounded-md border border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-3 border-b">Name</th>
                  <th className="text-left p-3 border-b">Email</th>
                  <th className="text-left p-3 border-b">Joined Date</th>
                  <th className="text-left p-3 border-b">Articles</th>
                  <th className="text-left p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rRows.length === 0 ? (
                  <tr><td className="text-center p-4 text-gray-500" colSpan={5}>No reporters found</td></tr>
                ) : rRows.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{r.name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.joinedDate}</td>
                    <td className="p-3">{r.articleCount}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={()=>openEditReporter(r.id)} className="px-3 py-1 rounded bg-[#1E3A8A] text-white">Edit</button>
                        <button onClick={()=>removeReporter(r.id)} className="px-3 py-1 rounded bg-[#EF4444] text-white">Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="text-gray-600 text-sm mb-2 md:mb-0">Showing {rTotal ? `${rStart+1}-${rEnd}`:'0-0'} of {rTotal} reporters</div>
            <div className="flex gap-2">
              <button disabled={rPage===1} onClick={()=>setRPage((p)=>Math.max(1,p-1))} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>
              <button disabled={rEnd>=rTotal} onClick={()=>setRPage((p)=>p+1)} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </main>

      {/* Confirm Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Action</h3>
            <p className="mb-6">{confirmMsg}</p>
            <div className="flex justify-end gap-3">
              <button onClick={()=>setConfirmOpen(false)} className="px-4 py-2 border rounded-md">Cancel</button>
              <button onClick={()=>onConfirm && onConfirm()} className="px-4 py-2 bg-[#EF4444] text-white rounded-md">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {showArticleEdit && editArticle && (
        <EditArticleModal
          article={editArticle}
          onClose={()=>{ setShowArticleEdit(false); setEditArticle(null) }}
          onSave={saveArticle}
        />
      )}

      {/* Edit Reporter Modal */}
      {showEdit && editReporter && (
        <EditReporterModal
          reporter={editReporter}
          onClose={()=>{setShowEdit(false); setEditReporter(null)}}
          onSave={saveReporter}
        />
      )}
    </div>
  )
}

function EditReporterModal({ reporter, onClose, onSave }: { reporter: Reporter, onClose: ()=>void, onSave: (r: Reporter)=>void }) {
  const [name, setName] = useState(reporter.name)
  const [email, setEmail] = useState(reporter.email)
  const [date, setDate] = useState(reporter.joinedDate)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Reporter</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><i className="fas fa-times"></i></button>
        </div>
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-gray-600 mb-2">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded-md py-2 px-3"/>
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded-md py-2 px-3"/>
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Joined Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full border rounded-md py-2 px-3"/>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
          <button onClick={()=>onSave({ ...reporter, name, email, joinedDate: date })} className="px-4 py-2 bg-[#1E3A8A] text-white rounded-md">Save Changes</button>
        </div>
      </div>
    </div>
  )
}

function EditArticleModal({ article, onClose, onSave }: { article: Article, onClose: ()=>void, onSave: (a: Article)=>void }) {
  const [title, setTitle] = useState(article.title)
  const [status, setStatus] = useState<Article['status']>(article.status)
  const [date, setDate] = useState(article.date)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Article</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><i className="fas fa-times"></i></button>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-600 mb-2">Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border rounded-md py-2 px-3" />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Status</label>
            <select value={status} onChange={(e)=>setStatus(e.target.value as Article['status'])} className="w-full border rounded-md py-2 px-3">
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Date</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full border rounded-md py-2 px-3" />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
          <button onClick={()=>onSave({ ...article, title, status, date })} className="px-4 py-2 bg-[#1E3A8A] text-white rounded-md">Save Changes</button>
        </div>
      </div>
    </div>
  )
}


