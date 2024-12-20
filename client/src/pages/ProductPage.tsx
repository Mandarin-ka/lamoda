import { Suspense, useDeferredValue, useState } from "react"
import SearchBar from "@/components/ProductsPage/SearchBar.tsx"
import Filters from "@/components/ProductsPage/Filters.tsx"
import ProductsList from "@/components/ProductsPage/ProductsList.tsx"
import Sortings from "@/components/ProductsPage/Sortings"

const ProductPage = () => {
  const [totalProducts, setTotalProducts] = useState(0)
  const [search, setSearch] = useState("")
  const searchDeffered = useDeferredValue(search)

  return (
    <div className="flex flex-col gap-2 md:gap-6 py-10 md:py-20">
      <SearchBar search={search} setSearch={setSearch} />
      <Sortings />
      <div className="block md:hidden rounded-md border border-secondary p-2">
        Всего продуктов найдено: {totalProducts}
      </div>
      <div className="flex flex-col md:grid grid-cols-[.5fr,1fr] lg:grid-cols-[.3fr,1fr] gap-4 lg:gap-6">
        <div>
          <Filters />
          <div className="hidden md:block mt-2 rounded-md border border-secondary p-4">
            Всего продуктов найдено: {totalProducts}
          </div>
        </div>
        <Suspense fallback={<div>Загрузка...</div>}>
          <ProductsList search={searchDeffered} setTotalProducts={setTotalProducts} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductPage
