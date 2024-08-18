import { filter } from 'lodash'

export const usePurchaseOrderCart = defineStore('purchase-order-cart-store', {
  state: () => {
    return {
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
    place() {
      this.$reset()
    }
  }
})
