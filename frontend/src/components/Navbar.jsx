import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShoppingBag, Plus, LogOut, User } from 'lucide-react'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/')
  }

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <ShoppingBag className="text-orange-500" size={26} />
          <span>Campus<span className="text-orange-500">Cart</span></span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/create" className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold transition">
                <Plus size={16} /> Sell Item
              </Link>
              <Link to="/my-listings" className="flex items-center gap-1 hover:text-orange-400 text-sm font-medium transition">
                <User size={16} /> My Listings
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 hover:text-orange-400 text-sm transition">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-400 text-sm font-medium transition">Login</Link>
              <Link to="/register" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold transition">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar