import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { Upload } from 'lucide-react'

const categories = ['Books', 'Electronics', 'Notes', 'Hostel Stuff', 'Cycles & Bikes', 'Clothes', 'Other']
const conditions = ['Like New', 'Good', 'Fair', 'Poor']

const CreateListing = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '', category: 'Books', condition: 'Good', phone: '' })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      images.forEach(img => formData.append('images', img))
      await api.post('/listings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Listing posted!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post listing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Post a New Item</h1>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title (e.g. Engineering Mathematics Book)"
            className="input"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description — condition details, edition, reason for selling..."
            className="input h-28 resize-none"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price (₹)"
              className="input"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="WhatsApp Number"
              className="input"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="input" value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}>
              {conditions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-orange-400 transition">
            <Upload className="text-slate-400 mb-2" size={24} />
            <span className="text-sm text-slate-500">Upload images (max 4)</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={e => setImages([...e.target.files])} />
            {images.length > 0 && <span className="text-xs text-orange-500 mt-2">{images.length} image(s) selected</span>}
          </label>
          <button type="submit" disabled={loading} className="btn-orange w-full py-3">
            {loading ? 'Posting...' : 'Post Listing'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateListing