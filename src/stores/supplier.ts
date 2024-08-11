import type { Supplier } from '@/types/supplier'

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
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupplierStore, import.meta.hot))
}
