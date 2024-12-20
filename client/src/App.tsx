import { useQuery } from "@tanstack/react-query"
import ProductPage from "./pages/ProductPage"
import { useEffect } from "react"
import { useFiltersStore } from "./store/products"
import { ThemeProvider } from "@/components/ThemeProvider"

function App() {
  const { isPending, data } = useQuery({
    queryKey: ["settings"],
    queryFn: () => fetch("/api/").then((res) => res.json()),
    refetchOnMount: "always",
  })

  const store = useFiltersStore((state) => state)

  useEffect(() => {
    if (isPending || !data) return
    store.setFilters(data.filters)
    store.setActiveFilters(Object.fromEntries(data.filters.map((filter) => [filter.key, []])))
    store.setSort(data.sortings, true)
  }, [data])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main>
        <ProductPage />
      </main>
    </ThemeProvider>
  )
}

export default App
