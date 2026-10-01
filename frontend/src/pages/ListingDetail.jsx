import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'
import { MessageCircle, Tag, User, ArrowLeft } from 'lucide-react'

const conditionColors = {
  'Like New': 'bg-green-100 text-green-700',
  'Good': 'bg-blue-100 text-blue-700',
  'Fair': 'bg-yellow-100 text-yellow-700',
  'Poor': 'bg-red-100 text-red-700',
}

const ListingDetail = () => {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/listings/${id}`)
        setListing(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return <div className="text-center py-20 text-slate-400">Loading...</div>
  if (!listing) return <div className="text-center py-20 text-slate-400">Listing not found</div>

  const whatsappLink = `https://wa.me/91${listing.phone}?text=Hi! I'm interested in your listing "${listing.title}" on Campus Cart.`

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-6 transition">
        <ArrowLeft size={16} /> Back to listings
      </Link>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-4">
            <img
              src={listing.images?.[activeImg] || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={listing.title}
              className="w-full h-72 object-cover rounded-xl"
            />
            {listing.images?.length > 1 && (
              <div className="flex gap-2 mt-3">
                {listing.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition ${activeImg === i ? 'border-orange-500' : 'border-transparent'}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-2xl font-bold text-slate-800">{listing.title}</h1>
                <span className="text-2xl font-bold text-orange-500">₹{listing.price}</span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag size={10} /> {listing.category}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${conditionColors[listing.condition]}`}>
                  {listing.condition}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{listing.description}</p>
              <Link to={`/seller/${listing.seller?._id}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition mb-6">
                <User size={14} /> {listing.seller?.name} • {listing.seller?.hostel || 'GL Bajaj'}
              </Link>
            </div>
            <a
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition"
>
  <MessageCircle size={18} /> Contact on WhatsApp
</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail