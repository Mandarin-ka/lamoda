import { create } from "zustand"

export const useFiltersStore = create((set) => ({
  price: [10, 9999],
  sort: {},
  availableSort: [],
  filters: [],
  activeFilters: {},
  setSort: (sortings, withDefault?: boolean) =>
    set((state) =>
      withDefault ? { availableSort: sortings, sort: withDefault ? sortings[0] : state.sort } : { sort: sortings }
    ),
  setPrice: (price) => set((state) => ({ price })),
  updateFilter: (category: string, title: string) =>
    set((state) => {
      if (!state.activeFilters[category]) state.activeFilters[category] = []
      if (state.activeFilters[category].includes(title))
        return (state.activeFilters[category] = state.activeFilters[category].filter((item) => item !== title))

      return (state.activeFilters[category] = [...state.activeFilters[category], title])
    }),
  setActiveFilters: (activeFilters) => set((state) => ({ activeFilters })),
  setFilters: (filters) => set((state) => ({ filters })),
}))
