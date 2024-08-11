import type { Supplier } from '@/types/supplier'

export const useSupplierStore = defineStore('supplier-store', {
  state: () => {
    return {
      supplier: [] as Supplier[]
    }
  },

  actions: {
    async fill() {
      const supplier = (await this.axios.get('/supplier')).data.items
      this.supplier = supplier
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupplierStore, import.meta.hot))
}
