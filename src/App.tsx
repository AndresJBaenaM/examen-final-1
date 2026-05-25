import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import DragonDetail from './pages/DragonDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 flex justify-between">
        <Link to="/" className="text-yellow-400 font-bold">Inicio</Link>
        <Link to="/favorites" className="text-yellow-400 font-bold">Favoritos</Link>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/dragon/:name" element={<DragonDetail />} />
        </Routes>
      </main>
    </div>
  )
}
