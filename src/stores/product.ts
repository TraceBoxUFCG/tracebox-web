import { toast } from '@/components/ui/toast'

export const useProductStore = defineStore('product-store', {
  state: () => {
    return {
      products: [] as Product[],
      productsResponse: {} as PaginatedResponse<Product>
    }
  },

  actions: {
    async fill() {
      const response: PaginatedResponse<Product> = (await this.axios.get('/catalog/product')).data
      this.products = response.items
      this.productsResponse = response
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
      this.products = response.items
      this.productsResponse = response
    },

    async delete(product: Product) {
      try {
        await this.axios.delete(`/catalog/product/${product.id}`)
        this.fill()
      } catch {
        toast({
          title: 'Falha na tentativa de deletar produto.',
          description: `Não foi possivel deletar o produto ${product.name}.`,
          variant: 'destructive'
        })
      }
    },

    async createProduct(productPayload: Product) {
      const payload = {
        ...productPayload
      }

      try {
        const created_product: Product = (await this.axios.post('catalog/product', payload)).data
        toast({
          title: 'Produto criado com sucesso',
          description: `O produto ${created_product.name} foi criado com sucesso`
        })
        this.fill()

        return created_product
      } catch {
        toast({
          title: 'Falha no cadastro do produto',
          description: `Não foi possivel criar o produot ${productPayload.name}.`,
          variant: 'destructive'
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
