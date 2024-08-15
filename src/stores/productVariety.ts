import { toast } from '@/components/ui/toast'

export const useProductVarietyStore = defineStore('product-variety-store', {
  state: () => {
    return {
      productVarities: [] as ProductVariety[],
      productVarietiesResponse: {} as PaginatedResponse<ProductVariety>
    }
  },

  actions: {
    async fill() {
      const response: PaginatedResponse<ProductVariety> = (
        await this.axios.get('/catalog/product_variety')
      ).data
      this.productVarities = response.items
      this.productVarietiesResponse = response
    },

    async search(q: string, page: number) {
      const response: PaginatedResponse<ProductVariety> = (
        await this.axios.get('/catalog/product_variety', {
          params: {
            q: q,
            page: page
          }
        })
      ).data
      this.productVarities = response.items
      this.productVarietiesResponse = response
    },

    async importVarieties(file: File) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        await this.axios.post('catalog/product_variety/import', file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        toast({
          title: 'CSV importado com sucesso',
          description: `Variedades de produtos foram criadas com sucesso`
        })
        this.fill()
      } catch {
        toast({
          title: 'Falha no cadastro do produto',
          description: `Não foi possivel importar o arquivo. Por favor entre em contato com suporte.`,
          variant: 'destructive'
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductVarietyStore, import.meta.hot))
}
