import { toast } from '@/components/ui/toast'

export const useSupplierStore = defineStore('supplier-store', {
  state: () => {
    return {
      suppliers: [] as Supplier[],
      suppliersResponse: {} as PaginatedResponse<Supplier>
    }
  },

  actions: {
    async fill() {
      const response: PaginatedResponse<Supplier> = (await this.axios.get('/supplier')).data
      this.suppliers = response.items
      this.suppliersResponse = response
    },

    async createSupplier(supplierPayload: Supplier) {
      const payload = {
        ...supplierPayload,
        address: {
          ...supplierPayload.address,
          latitude: 10,
          longitude: 10
        }
      }

      try {
        const createdSupplier: Supplier = (await this.axios.post('/supplier', payload)).data
        toast({
          title: 'Fornecedor criado com sucesso',
          description: `O Fornecedor ${createdSupplier.name} foi criado com sucesso`
        })
        this.fill()

        return createdSupplier
      } catch {
        toast({
          title: 'Falha no cadastro do fornecedor',
          description: `Não foi possivel criar o fornecedor ${supplierPayload.business_name}.`,
          variant: 'destructive'
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupplierStore, import.meta.hot))
}
