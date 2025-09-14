export type Reporter = { id: number; name: string; email: string; joinedDate: string; articleCount: number }
export type Article = { id: number; title: string; reporterId: number; reporterName: string; date: string; status: 'pending' | 'approved'; category?: string; imageUrl?: string; content?: string }

export function seedIfNeeded() {
  if (!localStorage.getItem('reporters')) {
    const reporters: Reporter[] = [
      { id: 1, name: 'John Doe', email: 'john@newsportal.com', joinedDate: '2024-01-15', articleCount: 12 },
      { id: 2, name: 'Jane Smith', email: 'jane@newsportal.com', joinedDate: '2024-02-03', articleCount: 8 },
      { id: 3, name: 'Michael Johnson', email: 'michael@newsportal.com', joinedDate: '2024-01-20', articleCount: 15 },
      { id: 4, name: 'Sarah Williams', email: 'sarah@newsportal.com', joinedDate: '2024-03-10', articleCount: 5 },
      { id: 5, name: 'Robert Brown', email: 'robert@newsportal.com', joinedDate: '2024-02-18', articleCount: 10 }
    ]
    localStorage.setItem('reporters', JSON.stringify(reporters))
  }

  if (!localStorage.getItem('articles')) {
    const articles: Article[] = [
      { id: 1, title: 'New Technology Breakthrough', reporterId: 1, reporterName: 'John Doe', date: '2025-03-15', status: 'approved' },
      { id: 2, title: 'Global Climate Summit Results', reporterId: 2, reporterName: 'Jane Smith', date: '2025-03-12', status: 'pending' },
      { id: 3, title: 'Economic Forecast for 2025', reporterId: 3, reporterName: 'Michael Johnson', date: '2025-03-10', status: 'approved' },
      { id: 4, title: 'Healthcare Innovations in Rural Areas', reporterId: 1, reporterName: 'John Doe', date: '2025-03-08', status: 'pending' },
      { id: 5, title: 'Sports Championship Recap', reporterId: 4, reporterName: 'Sarah Williams', date: '2025-03-05', status: 'approved' },
      { id: 6, title: 'Space Exploration Updates', reporterId: 3, reporterName: 'Michael Johnson', date: '2025-03-02', status: 'pending' },
      { id: 7, title: 'Urban Development Plans', reporterId: 5, reporterName: 'Robert Brown', date: '2025-02-28', status: 'approved' },
      { id: 8, title: 'Education Reform Debate', reporterId: 2, reporterName: 'Jane Smith', date: '2025-02-25', status: 'pending' }
    ]
    localStorage.setItem('articles', JSON.stringify(articles))
  }

  if (!localStorage.getItem('subscribers')) {
    localStorage.setItem('subscribers', JSON.stringify(1250))
  }
}

export function getArticles(): Article[] {
  return JSON.parse(localStorage.getItem('articles') || '[]')
}

export function setArticles(articles: Article[]) {
  localStorage.setItem('articles', JSON.stringify(articles))
}

export function getReporters(): Reporter[] {
  return JSON.parse(localStorage.getItem('reporters') || '[]')
}

export function setReporters(reporters: Reporter[]) {
  localStorage.setItem('reporters', JSON.stringify(reporters))
}

export function getSubscribers(): number {
  return JSON.parse(localStorage.getItem('subscribers') || '0')
}

export function setSubscribers(value: number) {
  localStorage.setItem('subscribers', JSON.stringify(value))
}


