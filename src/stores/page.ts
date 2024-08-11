export const usePageStore = defineStore('page-store', {
  state: () => {
    return {
      title: ''
    }
  },

  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupplierStore, import.meta.hot))
}
