import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { ShoppingBag } from 'lucide-react'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', hostel: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await api.post('/auth/register', form)
      login(res.data.user, res.data.token)
      toast.success('Account created!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <ShoppingBag className="text-orange-500" size={28} />
          <h1 className="text-2xl font-bold text-slate-800">Campus<span className="text-orange-500">Cart</span></h1>
        </div>
        <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center">Create your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            className="input"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number (for WhatsApp contact)"
            className="input"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Hostel Name (optional)"
            className="input"
            value={form.hostel}
            onChange={e => setForm({ ...form, hostel: e.target.value })}
          />
          <button type="submit" disabled={loading} className="btn-orange w-full py-3">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-4">
          Already have an account? <Link to="/login" className="text-orange-500 font-medium">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register