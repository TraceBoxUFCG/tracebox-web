export const useSupplierStore = defineStore('supplier-store', {
  state: () => {
    return {
      products: []
    }
  },

  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupplierStore, import.meta.hot))
}
