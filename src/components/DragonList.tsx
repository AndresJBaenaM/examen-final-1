import DragonCard from './DragonCard'
import type { Dragon } from '../services/DragonService'

export default function DragonList({ dragons }: { dragons: Dragon[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {dragons.map(dragon => (
        <DragonCard key={dragon.name} dragon={dragon} />
      ))}
    </div>
  )
}
