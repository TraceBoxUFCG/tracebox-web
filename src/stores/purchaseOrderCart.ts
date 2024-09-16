import { toast } from '@/components/ui/toast'

export const usePurchaseOrderCart = defineStore('purchase-order-cart-store', {
  state: () => {
    return {
      id: 0 as number,
      supplier: {} as Supplier,
      expectedArrivalDate: {} as Date,
      items: [] as PurchaseOrderItem
    }
  },

  actions: {
    addItem(productVariety: ProductVariety, boxesQuantity: number, unitPrice: number) {
      const actualItems = [...this.items]
      actualItems.push({
        boxes_quantity: boxesQuantity,
        unit_price: unitPrice,
        product_variety: productVariety
      })

      this.items = actualItems
    },
    setSupplier(supplier: Supplier) {
      this.supplier = supplier
    },
    setExpectedArrivalDate(expectedArrivalDate: Date) {
      this.expectedArrivalDate = expectedArrivalDate
    },
    clearItem(index: number) {
      const actualItems = [...this.items]
      actualItems.splice(index, 1)
      this.items = actualItems
    },
    async place() {
      try {
        const payload: PurchaseOrderCart = {
          id: this.id !== 0 ? this.id : undefined,
          expected_arrival_date: this.expectedArrivalDate?.toISOString().split('T')[0],
          supplier_id: this.supplier.id,
          items: this.items.map((item: PurchaseOrderItem) => {
            return {
              id: item.id,
              boxes_quantity: item.boxes_quantity,
              unit_price: item.unit_price,
              product_variety_id: item.product_variety.id
            }
          })
        }
        const response: PurchaseOrder = (
          await this.axios.post('/purchases/purchase_order/place', payload)
        ).data
        toast({
          title: 'Ordem de compra criada com sucesso',
          description: `Ordem de compra para o fornecedor ${response.supplier.business_name} com entrega esperada para o dia ${response.expected_arrival_date} criada com sucesso`
        })
        this.$reset()
      } catch {
        toast({
          title: 'Falha na criação da ordem de compra',
          description: `Não foi possivel criar a ordem de compra para fornecedor ${this.supplier.business_name}.`,
          variant: 'destructive'
        })
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePurchaseOrderCart, import.meta.hot))
}
