export const useAssetStore = defineStore('asset-store', {
  state: () => {
    return {
      assets: [] as Asset[],
      assetsResponse: {} as PaginatedResponse<Asset>
    }
  },

  actions: {
    async fill() {
      const response: PaginatedResponse<Asset> = (await this.axios.get('/stock/asset')).data
      this.assets = response.items
      this.assetsResponse = response
    },

    async search(q: string, page: number) {
      const response: PaginatedResponse<Product> = (
        await this.axios.get('/catalog/product', {
          params: {
            q: q,
            page: page
          }
        })
      ).data
      this.assets = response.items
      this.assetsResponse = response
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetStore, import.meta.hot))
}
