import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDragonDetail } from '../services/DragonService'
import type { DragonDetail } from '../services/DragonService'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { useFavorites } from '../context/FavoritesContext'
import { FaHeart } from 'react-icons/fa'

export default function DragonDetail() {
  const { name } = useParams<{ name: string }>()
  const [dragon, setDragon] = useState<DragonDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const loadDragon = async () => {
      try {
        if (name) {
          const data = await fetchDragonDetail(name)
          setDragon(data)
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error desconocido')
        }
      } finally {
        setLoading(false)
      }
    }
    loadDragon()
  }, [name])

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!dragon) return <ErrorMessage message="Dragón no encontrado" />

  const favorite = isFavorite(dragon.name)

  return (
    <div className="p-4 text-center">
      <Link to="/" className="text-yellow-400 block mb-4">← Volver</Link>

      <img
        src={dragon.image}
        alt={dragon.name}
        className="w-48 h-48 mx-auto mb-4"
      />
      <h1 className="text-3xl font-bold capitalize mb-2">{dragon.name}</h1>
      <p className="text-gray-500 mb-4">
        Tipos: {dragon.types.join(', ')}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {dragon.stats
          .filter(s => ['hp', 'attack', 'defense'].includes(s.name))
          .map((stat) => (
            <div key={stat.name} className="bg-gray-800 text-white rounded p-2">
              <p className="capitalize">{stat.name}</p>
              <p className="font-bold">{stat.value}</p>
            </div>
          ))}
      </div>

      <button
        onClick={() =>
          favorite ? removeFavorite(dragon.name) : addFavorite(dragon)
        }
        className={`flex items-center gap-2 px-4 py-2 rounded mx-auto ${
          favorite ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
        }`}
      >
        <FaHeart className={favorite ? 'text-red-300' : 'text-gray-300'} />
        {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>
    </div>
  )
}
