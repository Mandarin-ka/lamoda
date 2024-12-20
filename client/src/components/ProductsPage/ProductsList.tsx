import { useDeferredValue, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import Product from "./Product"
import { useFiltersStore } from "@/store/products"
import { useDebounce } from "@uidotdev/usehooks"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import qs from "qs"

const ProductsList = ({
  search,
  setTotalProducts,
}: {
  search: string
  setTotalProducts: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [autoAnimate] = useAutoAnimate(/* optional config */)
  const store = useFiltersStore((state) => state)
  const searchParams = useDebounce([store.activeFilters, search, store.price, store.sort], 300)

  const { isPending, data: products } = useQuery({
    queryKey: ["products", ...searchParams],
    queryFn: useDeferredValue(async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000)) // simulate for testing usedeferredvalue
      const query = qs.stringify({
        price: store.price,
        sort: store.sort.key,
        filters: store.activeFilters,
        ...(search && { q: search }),
      })
      return fetch(`/api/products?${query}`).then((res) => res.json())
    }),
    refetchOnMount: "always",
  })

  useEffect(() => {
    if (isPending) return
    setTotalProducts(products?.length || 0)
  }, [products])

  if (!products?.length) return <div>Ничего не найдено </div>

  return (
    <div
      ref={autoAnimate}
      className="w-full grid grid-rows-[auto] grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 h-full"
    >
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsList
