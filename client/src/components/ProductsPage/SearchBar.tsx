import React from "react"
import { Input } from "../ui/input"

const SearchBar = ({
  search,
  setSearch,
}: {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div>
      <Input
        icon
        className="py-6"
        type="text"
        placeholder="Что-нибудь ищете?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
