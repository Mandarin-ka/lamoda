import { useFiltersStore } from "@/store/products"
import { Button } from "../ui/button"

const Sortings = () => {
  const store = useFiltersStore((state) => state)

  return (
    <div className="rounded-md border border-secondary p-2 md:p-4 flex items-center gap-2 overflow-auto">
      {store.availableSort.map((sort: { key: string; name: string }) => (
        <Button
          className={
            sort.key === store.sort.key
              ? "border-secondary-foreground bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:text-primary-foreground"
          }
          onClick={() => store.setSort(sort)}
          key={sort.name}
        >
          {sort.name}
        </Button>
      ))}
    </div>
  )
}

export default Sortings
