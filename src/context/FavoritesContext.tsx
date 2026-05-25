import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Dragon } from '../services/DragonService'

const FavoritesContext = createContext<{
  favorites: Dragon[]
  addFavorite: (dragon: Dragon) => void
  removeFavorite: (dragonName: string) => void
  isFavorite: (dragonName: string) => boolean
} | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Dragon[]>([])

  function addFavorite(dragon: Dragon) {
    if (!favorites.some(f => f.name === dragon.name)) {
      setFavorites([...favorites, dragon])
    }
  }

  function removeFavorite(dragonName: string) {
    setFavorites(favorites.filter(f => f.name !== dragonName))
  }

  function isFavorite(dragonName: string) {
    return favorites.some(f => f.name === dragonName)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}
