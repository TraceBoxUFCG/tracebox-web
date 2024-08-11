import { toast } from '@/components/ui/toast'

export const useSupplierStore = defineStore('supplier-store', {
  state: () => {
    return {
      suppliers: [] as Supplier[]
    }
  },

  actions: {
    async fill() {
      const supplier = (await this.axios.get('/supplier')).data.items
      this.suppliers = supplier
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

      const createdSupplier: Supplier = (await this.axios.post('/supplier', payload)).data

      if (createdSupplier) {
        toast({
          title: 'Fornecedor criado com sucesso',
          description: `O Fornecedor ${createdSupplier.name} foi criado com sucesso`
        })
      } else {
        toast({
          title: 'Falha no cadastro do fornecedor',
          description: `Não foi possivel criar o fornecedor ${supplierPayload.name}.`,
          variant: 'destructive'
        })
      }

      this.fill()

      return createdSupplier
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupplierStore, import.meta.hot))
}
