import { useEffect, useState } from "react"
import { useFiltersStore } from "@/store/products"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useDebounce } from "@uidotdev/usehooks"

const Filters = () => {
  const store = useFiltersStore((state) => state)
  const [price, setPrice] = useState(store.price)
  const debouncedPrice = useDebounce(price, 300)

  const setFilter = (category: string, title: string) => store.updateFilter(category, title)

  useEffect(() => {
    store.setPrice(price)
  }, [debouncedPrice])

  return (
    <div className="rounded-md border border-secondary p-4 h-fit">
      {store.filters.map((filter: { key: string; name: string; data: string[] }) => (
        <div key={filter.name}>
          <p className="text-2xl font-bold">{filter.name}</p>
          <div className="flex flex-col md:gap-1 mt-2 mb-3 md:mb-5">
            {filter.data.map((title: string) => (
              <div key={title} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  id={title}
                  checked={store.activeFilters[filter.key]?.includes(title)}
                  onCheckedChange={() => setFilter(filter.key, title)}
                />
                <Label htmlFor={title} className="cursor-pointer w-full py-2 font-normal capitalize">
                  {title}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <p className="text-2xl font-bold">Цена:</p>
        <div className="mt-2 items-center gap-2 grid grid-cols-2">
          <Input
            type="number"
            placeholder="Мин."
            min="10"
            max="9999"
            value={price?.[0]}
            onChange={(e) => setPrice((prev) => [+e.target.value, prev[1]])}
          />
          <Input
            type="number"
            placeholder="Макс."
            min="10"
            max="9999"
            value={price?.[1]}
            onChange={(e) => setPrice((prev) => [prev[0], +e.target.value])}
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
