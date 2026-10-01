import { Link } from 'react-router-dom'
import { MessageCircle, Tag } from 'lucide-react'

const conditionColors = {
  'Like New': 'bg-green-100 text-green-700',
  'Good': 'bg-blue-100 text-blue-700',
  'Fair': 'bg-yellow-100 text-yellow-700',
  'Poor': 'bg-red-100 text-red-700',
}

const ListingCard = ({ listing }) => {
  const whatsappLink = `https://wa.me/91${listing.phone}?text=Hi! I'm interested in your listing "${listing.title}" on Campus Cart.`

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={listing.title}
          className="w-full h-48 object-contain hover:opacity-95 transition"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/listing/${listing._id}`} className="font-semibold text-slate-800 hover:text-orange-500 transition line-clamp-1">
            {listing.title}
          </Link>
          <span className="text-orange-500 font-bold text-lg whitespace-nowrap">₹{listing.price}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Tag size={10} /> {listing.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${conditionColors[listing.condition]}`}>
            {listing.condition}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Link to={`/seller/${listing.seller?._id}`} className="text-xs text-slate-500 hover:text-orange-500 transition">
            {listing.seller?.name} • {listing.seller?.hostel || 'GL Bajaj'}
          </Link>
          
          <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition"
          >
  <MessageCircle size={12} /> WhatsApp
</a>
           
        </div>
      </div>
    </div>
  )
}

export default ListingCard