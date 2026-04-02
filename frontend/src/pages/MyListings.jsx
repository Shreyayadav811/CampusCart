import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Trash2, Plus } from 'lucide-react'

const MyListings = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchMyListings = async () => {
    try {
      const res = await api.get(`/users/${user.id}`)
      setListings(res.data.listings)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMyListings() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this listing?')) return
    try {
      await api.delete(`/listings/${id}`)
      toast.success('Listing deleted!')
      setListings(listings.filter(l => l._id !== id))
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Listings</h1>
        <Link to="/create" className="btn-orange flex items-center gap-1">
          <Plus size={16} /> Post New
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading...</div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 mb-4">You haven't posted anything yet</p>
          <Link to="/create" className="btn-orange">Post your first item</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {listings.map(listing => (
            <div key={listing._id} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
              <img
                src={listing.images?.[0] || 'https://via.placeholder.com/100?text=No+Image'}
                alt={listing.title}
                className="w-28 h-28 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-slate-800 line-clamp-1">{listing.title}</h3>
                  <p className="text-orange-500 font-bold">₹{listing.price}</p>
                  <span className="text-xs text-slate-400">{listing.category}</span>
                </div>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm transition mt-2"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyListings