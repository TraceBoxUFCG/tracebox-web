export const usePurchaseOrderStore = defineStore('purchase-order-store', {
  state: () => {
    return {
      purchaseOrders: [] as PurchaseOrder[],
      purchaseOrdersResponse: {} as PaginatedResponse<PurchaseOrder>
    }
  },

  actions: {
    async search(
      page: number,
      q?: string,
      expected_arrival_date?: Date,
      status?: PurchaseOrderStatusEnum
    ) {
      const response: PaginatedResponse<PurchaseOrder> = (
        await this.axios.get('/purchaes/purchase_order', {
          params: {
            q: q,
            page: page,
            expected_arrival_date: expected_arrival_date,
            status: status
          }
        })
      ).data
      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
