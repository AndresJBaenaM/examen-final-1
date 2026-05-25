import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [value, setValue] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setValue(newValue)
    onSearch(newValue)
  }

  return (
    <input
      type="text"
      placeholder="Buscar dragón..."
      value={value}
      onChange={handleChange}
      className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  )
}
