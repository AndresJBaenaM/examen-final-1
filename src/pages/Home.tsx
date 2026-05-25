import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import DragonList from '../components/DragonList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { fetchDragons } from '../services/DragonService'
import type { Dragon } from '../services/DragonService'

export default function Home() {
    const [dragons, setDragons] = useState<Dragon[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        const loadDragons = async () => {
            try {
                const data = await fetchDragons()
                setDragons(data)
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
        loadDragons()
    }, [])

    const filteredDragons = dragons.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <SearchBar onSearch={setSearch} />
            </div>
            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && filteredDragons.length === 0 && <EmptyState />}
            {!loading && !error && filteredDragons.length > 0 && (
                <DragonList dragons={filteredDragons} />
            )}
        </div>
    )
}
