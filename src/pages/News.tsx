import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function News() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Initialize localStorage like HTML
    if (!localStorage.getItem('reporters')) {
      localStorage.setItem('reporters', JSON.stringify([]))
    }
    if (!localStorage.getItem('admins')) {
      localStorage.setItem('admins', JSON.stringify([{ id: 1, username: 'admin', password: 'admin123', name: 'Admin User' }]))
    }
    if (!localStorage.getItem('articles')) {
      localStorage.setItem('articles', JSON.stringify([]))
    }
    if (!localStorage.getItem('newsletter_subscribers')) {
      localStorage.setItem('newsletter_subscribers', JSON.stringify([]))
    }
  }, [])

  function subscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) {
      setMessage('Please enter your email address')
      return
    }
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]')
    subscribers.push(email)
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers))
    setMessage('Thank you for subscribing to our newsletter!')
    setEmail('')
    setTimeout(() => setMessage(''), 5000)
  }
  return (
    <div>
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between"> 
            <div className="flex items-center">
              <Link to="/news" className="text-3xl font-bold text-[#FF6600]"><span className="text-black">Kosmo</span> News</Link>
            </div>
            <div className="hidden md:block flex-grow max-w-md mx-8">
              <div className="relative">
                <input type="text" placeholder="Search news..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent" />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/reporter" className="px-4 py-2 text-[#FF6600] font-medium">Reporter Login</Link>
              <Link to="/admin" className="px-4 py-2 bg-[#FF6600] text-white rounded-md">Admin Login</Link>
            </div>
            <div className="md:hidden">
              <button onClick={()=>setMobileOpen(v=>!v)} className="text-black"><i className="fas fa-bars text-2xl"></i></button>
            </div>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div className="container mx-auto px-4 md:hidden mt-4 pb-2">
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <input type="text" placeholder="Search news..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent" />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
            <Link to="/reporter" className="px-4 py-2 text-[#FF6600] font-medium border border-[#FF6600] rounded-md text-center">Reporter Login</Link>
            <Link to="/admin" className="px-4 py-2 bg-[#FF6600] text-white rounded-md text-center">Admin Login</Link>
          </div>
        </div>
      )}
      <section className="featured-banner mb-8" style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2017/07/10/23/43/question-mark-2492009_1280.jpg')` }}>
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="pb-12 w-full md:w-2/3">
            <span className="bg-[#FF6600] text-white px-3 py-1 rounded-md text-sm font-medium mb-2 inline-block">Breaking News</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Technological Innovations Reshape Global Communications</h1>
            <p className="text-gray-200 mb-4 text-lg">Revolutionary breakthroughs in quantum networking promise to transform how we connect across continents.</p>
            <Link to="/news" className="inline-block px-6 py-3 bg-[#FF6600] text-white rounded-md font-medium">Read Full Story</Link>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 pb-16">
        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            <a href="#" className="px-4 py-2 bg-[#FF6600] text-white rounded-md whitespace-nowrap">All News</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">Politics</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">Sports</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">Technology</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">Business</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">Entertainment</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">Africa</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">World</a>
            <a href="#" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md whitespace-nowrap">Lifestyle</a>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img src="https://cdn.pixabay.com/photo/2017/12/14/09/41/new-york-3018557_1280.jpg" alt="Economic News" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-[#A8D5BA] text-black text-xs font-semibold rounded mb-2">Business</span>
              <h3 className="font-bold text-xl mb-2">Global Markets Respond to New Economic Policies</h3>
              <p className="text-gray-700 mb-3">Financial experts weigh in on the implications of recent economic reforms and their impact on international markets.</p>
              <Link to="/news" className="text-[#FF6600] font-medium flex items-center">Read More<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></Link>
            </div>
          </div>
          {/* Card 2 */}
          <div className="card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img src="https://cdn.pixabay.com/photo/2016/01/19/01/42/library-1147815_1280.jpg" alt="Education News" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-[#A8D5BA] text-black text-xs font-semibold rounded mb-2">Education</span>
              <h3 className="font-bold text-xl mb-2">New Education Framework to be Implemented Nationwide</h3>
              <p className="text-gray-700 mb-3">The government announces comprehensive changes to the national education system aimed at improving learning outcomes.</p>
              <Link to="/news" className="text-[#FF6600] font-medium flex items-center">Read More<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></Link>
            </div>
          </div>
          {/* Card 3 */}
          <div className="card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img src="https://cdn.pixabay.com/photo/2021/08/01/12/58/beach-6514331_1280.jpg" alt="Sports News" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-[#A8D5BA] text-black text-xs font-semibold rounded mb-2">Sports</span>
              <h3 className="font-bold text-xl mb-2">Olympic Committee Announces Host City for 2036 Games</h3>
              <p className="text-gray-700 mb-3">After years of deliberation, the International Olympic Committee reveals which city will host the 2036 Olympic Games.</p>
              <Link to="/news" className="text-[#FF6600] font-medium flex items-center">Read More<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></Link>
            </div>
          </div>
          {/* Card 4 */}
          <div className="card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img src="https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_1280.jpg" alt="Technology News" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-[#A8D5BA] text-black text-xs font-semibold rounded mb-2">Technology</span>
              <h3 className="font-bold text-xl mb-2">Breakthrough in Quantum Computing Achieves New Record</h3>
              <p className="text-gray-700 mb-3">Scientists have achieved quantum supremacy with a processor solving complex problems in seconds.</p>
              <Link to="/news" className="text-[#FF6600] font-medium flex items-center">Read More<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></Link>
            </div>
          </div>
          {/* Card 5 */}
          <div className="card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img src="https://cdn.pixabay.com/photo/2015/11/04/20/59/milky-way-1023340_1280.jpg" alt="Science News" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-[#A8D5BA] text-black text-xs font-semibold rounded mb-2">Science</span>
              <h3 className="font-bold text-xl mb-2">New Planet Discovered with Potential for Habitable Conditions</h3>
              <p className="text-gray-700 mb-3">Astronomers identify a promising exoplanet with characteristics similar to Earth in the habitable zone of its star.</p>
              <Link to="/news" className="text-[#FF6600] font-medium flex items-center">Read More<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></Link>
            </div>
          </div>
          {/* Card 6 */}
          <div className="card bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img src="https://cdn.pixabay.com/photo/2018/03/27/21/43/startup-3267505_1280.jpg" alt="Politics News" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 bg-[#A8D5BA] text-black text-xs font-semibold rounded mb-2">Politics</span>
              <h3 className="font-bold text-xl mb-2">International Summit Concludes with Major Climate Agreement</h3>
              <p className="text-gray-700 mb-3">World leaders reach consensus on ambitious targets to reduce global carbon emissions by 2030.</p>
              <a href="#/news" className="text-[#FF6600] font-medium flex items-center">Read More<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></a>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column: Categories + Newsletter/Editor's Pick */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">News Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a href="#" className="card bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="h-40 bg-gray-800 relative overflow-hidden">
                  <img src="https://cdn.pixabay.com/photo/2019/04/14/08/09/capitol-4126554_1280.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Politics" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><h3 className="text-white text-xl font-bold">Politics</h3></div>
                </div>
              </a>
              <a href="#" className="card bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="h-40 bg-gray-800 relative overflow-hidden">
                  <img src="https://cdn.pixabay.com/photo/2016/11/29/02/05/audience-1866738_1280.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Sports" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><h3 className="text-white text-xl font-bold">Sports</h3></div>
                </div>
              </a>
              <a href="#" className="card bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="h-40 bg-gray-800 relative overflow-hidden">
                  <img src="https://cdn.pixabay.com/photo/2017/12/12/12/44/bitcoin-3014614_1280.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Technology" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><h3 className="text-white text-xl font-bold">Technology</h3></div>
                </div>
              </a>
              <a href="#" className="card bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="h-40 bg-gray-800 relative overflow-hidden">
                  <img src="https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Business" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><h3 className="text-white text-xl font-bold">Business</h3></div>
                </div>
              </a>
              <a href="#" className="card bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="h-40 bg-gray-800 relative overflow-hidden">
                  <img src="https://cdn.pixabay.com/photo/2015/12/09/17/12/popcorn-1085072_1280.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Entertainment" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><h3 className="text-white text-xl font-bold">Entertainment</h3></div>
                </div>
              </a>
              <a href="#" className="card bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="h-40 bg-gray-800 relative overflow-hidden">
                  <img src="https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="Lifestyle" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><h3 className="text-white text-xl font-bold">Lifestyle</h3></div>
                </div>
              </a>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-[#A8D5BA] bg-opacity-20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
              <p className="text-gray-700 mb-4">Get the latest news and updates delivered straight to your inbox.</p>
              <form onSubmit={subscribe}>
                <div className="mb-3">
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent" required />
                </div>
                <button type="submit" className="w-full bg-[#FF6600] text-white py-2 rounded-md hover:bg-orange-700 transition-colors duration-300">Subscribe</button>
              </form>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold mb-3">Editor's Pick</h3>
              <div className="mb-4">
                <img src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg" alt="Opinion" className="w-full h-40 object-cover rounded-md" />
              </div>
              <h4 className="font-bold text-lg mb-2">The Future of Work in a Digital Economy</h4>
              <p className="text-gray-700 mb-3">How remote work and AI technologies are reshaping the global workforce and creating new opportunities.</p>
              <Link to="/news" className="text-[#FF6600] font-medium">Continue Reading →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Kosmo news </h3>
              <h3 className="text-2xl font-bold mb-4">Kosmo news</h3>
              <p className="text-gray-300 mb-4">Delivering the most important stories from around the globe, with accuracy, fairness and insight.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Politics</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Business</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Technology</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Entertainment</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Sports</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start"><i className="fas fa-map-marker-alt mt-1 mr-3 text-[#FF6600]"></i><span>123 News Street, Nairobi, Kenya</span></li>
                <li className="flex items-start"><i className="fas fa-phone-alt mt-1 mr-3 text-[#FF6600]"></i><span>+254 123 456 789</span></li>
                <li className="flex items-start"><i className="fas fa-envelope mt-1 mr-3 text-[#FF6600]"></i><span>info@Newsnews.com</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">

              <p className="text-gray-400 text-sm">© 2025 Kosmo news . All rights reserved.</p>

              <p className="text-gray-400 text-sm">© 2025 Kosmo news. All rights reserved.</p>

              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 text-sm hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-400 text-sm hover:text-white">Terms of Service</a>
                <a href="#" className="text-gray-400 text-sm hover:text-white">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="container mx-auto px-4 pb-16">
        <div className="lg:w-1/3 max-w-xl bg-[#A8D5BA] bg-opacity-20 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-gray-700 mb-4">Get the latest news and updates delivered straight to your inbox.</p>
          <form onSubmit={subscribe}>
            <div className="mb-3">
              <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent" required />
            </div>
            <button type="submit" className="w-full bg-[#FF6600] text-white py-2 rounded-md">Subscribe</button>
          </form>
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  )
}


