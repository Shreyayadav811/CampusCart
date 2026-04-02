import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateListing from './pages/CreateListing'
import ListingDetail from './pages/ListingDetail'
import MyListings from './pages/MyListings'
import SellerProfile from './pages/SellerProfile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listing/:id" element={<ListingDetail />} />
        <Route path="/seller/:id" element={<SellerProfile />} />
        <Route path="/create" element={
          <ProtectedRoute><CreateListing /></ProtectedRoute>
        } />
        <Route path="/my-listings" element={
          <ProtectedRoute><MyListings /></ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App