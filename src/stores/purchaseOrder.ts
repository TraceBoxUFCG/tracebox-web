import { toast } from '@/components/ui/toast'
import { getLocalTimeZone, today } from '@internationalized/date'

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
        await this.axios.get('/purchases/purchase_order', {
          params: {
            q: q,
            page: page,
            expected_arrival_date: expected_arrival_date?.toISOString().split('T')[0],
            status: status
          }
        })
      ).data
      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    },
    async fill() {
      const response: PaginatedResponse<PurchaseOrder> = (
        await this.axios.get('/purchases/purchase_order', {
          params: {
            expected_arrival_date: today(getLocalTimeZone())
              .toDate(getLocalTimeZone())
              ?.toISOString()
              .split('T')[0]
          }
        })
      ).data
      this.purchaseOrders = response.items
      this.purchaseOrdersResponse = response
    },
    async confirm(id: number) {
      try {
        await this.axios.post(`/purchases/purchase_order/${id}/confirm`)
        await this.search(1, String(id))
      } catch {
        toast({
          title: 'Falha na tentativa de confirmar ordem de compra.',
          description: `Não foi possivel confirmar a ordem de compra`,
          variant: 'destructive'
        })
      }
      toast({
        title: 'Ordem de Compra confirmada com sucesso!'
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePurchaseOrderStore, import.meta.hot))
}
