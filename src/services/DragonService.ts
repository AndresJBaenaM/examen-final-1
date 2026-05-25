
export interface Dragon {
  name: string
  image: string
  types: string[]
}

export interface DragonDetail extends Dragon {
  stats: { name: string; value: number }[]
  abilities: string[]
}

// Obtener lista de dragones (Pokémon)
export async function fetchDragons(): Promise<Dragon[]> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
  if (!response.ok) throw new Error('Error al cargar dragones')
  const data: { results: { name: string; url: string }[] } = await response.json()

  const dragons: Dragon[] = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailRes = await fetch(pokemon.url)
      if (!detailRes.ok) throw new Error('Error al cargar detalle de dragón')
      const detail = await detailRes.json()

      return {
        name: detail.name,
        image: detail.sprites.other['official-artwork'].front_default,
        types: detail.types.map((t: { type: { name: string } }) => t.type.name),
      }
    })
  )

  return dragons
}

// Obtener detalle de un dragón específico
export async function fetchDragonDetail(name: string): Promise<DragonDetail> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (!response.ok) throw new Error('Error al cargar detalle del dragón')
  const detail = await response.json()

  return {
    name: detail.name,
    image: detail.sprites.other['official-artwork'].front_default,
    types: detail.types.map((t: { type: { name: string } }) => t.type.name),
    stats: detail.stats.map(
      (s: { base_stat: number; stat: { name: string } }) => ({
        name: s.stat.name,
        value: s.base_stat,
      })
    ),
    abilities: detail.abilities.map(
      (a: { ability: { name: string } }) => a.ability.name
    ),
  }
}
