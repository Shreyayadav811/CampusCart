import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import ListingCard from '../components/ListingCard'
import { User } from 'lucide-react'

const SellerProfile = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/users/${id}`)
        setData(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return <div className="text-center py-20 text-slate-400">Loading...</div>
  if (!data) return <div className="text-center py-20 text-slate-400">User not found</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex items-center gap-4">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
          <User className="text-orange-500" size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{data.user.name}</h1>
          <p className="text-slate-500 text-sm">{data.user.hostel || 'GL Bajaj'} • {data.listings.length} listing(s)</p>
        </div>
      </div>

      {data.listings.length === 0 ? (
        <div className="text-center py-20 text-slate-400">No listings yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.listings.map(listing => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SellerProfile