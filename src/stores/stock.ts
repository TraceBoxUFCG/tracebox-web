export const useStockStore = defineStore('stock-store', {
  state: () => {
    return {
      stock: [] as Stock[],
      stockResponse: {} as PaginatedResponse<Stock>
    }
  },

  actions: {
    async fill() {
      const response: PaginatedResponse<Product> = (await this.axios.get('/stock/')).data
      this.stock = response.items
      this.stockResponse = response
    },

    async search(q: string, page: number) {
      const response: PaginatedResponse<Product> = (
        await this.axios.get('/stock/', {
          params: {
            q: q,
            page: page
          }
        })
      ).data
      this.stock = response.items
      this.stockResponse = response
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStockStore, import.meta.hot))
}
