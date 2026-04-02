import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import api from '../utils/api'
import ListingCard from '../components/ListingCard'

const categories = ['All', 'Books', 'Electronics', 'Notes', 'Hostel Stuff', 'Cycles & Bikes', 'Clothes', 'Other']

const Home = () => {
  const [listings, setListings] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  const fetchListings = async () => {
    try {
      setLoading(true)
      const res = await api.get('/listings', { params: { search, category } })
      setListings(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchListings() }, [search, category])

  return (
    <div>
      {/* Hero */}
      <div className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-3">
            Buy & Sell at <span className="text-orange-500">GL Bajaj</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8">by students, for students 🎓</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search for books, electronics, notes..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                category === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading listings...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No listings found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map(listing => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home