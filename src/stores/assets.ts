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
      const response: PaginatedResponse<Asset> = (
        await this.axios.get('/stock/asset', {
          params: {
            q: q,
            page: page
          }
        })
      ).data
      this.assets = response.items
      this.assetsResponse = response
    },
    async generateAssetsTags(payload: GenerateAssetTagPayload) {
      const response = await this.axios.post('/stock/asset/generate_tags/', payload, {
        responseType: 'blob'
      })
      // Criar um link temporário para baixar o arquivo
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'tags.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      await this.fill()
    },
    async getTagById(id: number) {
      const response = await this.axios.get(`/stock/asset/${id}/tag`, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${id}_tag.pdf`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetStore, import.meta.hot))
}
