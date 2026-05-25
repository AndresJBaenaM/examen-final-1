import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import type { Dragon } from '../services/DragonService'
import { FaHeart } from 'react-icons/fa'

interface Props {
  dragon: Dragon
}

export default function DragonCard({ dragon }: Props) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(dragon.name)
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
      <img
        src={dragon.image}
        alt={dragon.name}
        className="w-32 h-32 object-contain mb-2"
      />
      <Link
        to={`/dragon/${dragon.name}`}
        className="text-xl font-bold text-yellow-400 mb-1 capitalize"
      >
        {dragon.name}
      </Link>
      <p className="text-sm text-gray-300 mb-2">
        {dragon.types.join(', ')}
      </p>
      <button
        onClick={() =>
          favorite ? removeFavorite(dragon.name) : addFavorite(dragon)
        }
        className={`flex items-center gap-2 px-3 py-1 rounded ${
          favorite ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
        }`}
      >
        <FaHeart className={favorite ? 'text-red-300' : 'text-gray-300'} />
        {favorite ? 'Quitar' : 'Favorito'}
      </button>
    </div>
  )
}
