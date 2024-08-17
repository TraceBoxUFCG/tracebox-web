import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { filter } from 'lodash'

export const usePurchaseOrderCart = defineStore('purchase-order-cart-store', {
  state: () => {
    return {
      supplier: useLocalStorage('PurchaseOrderCart:supplier', undefined) as RemovableRef<Supplier>,
      expectedArrivalDate: useLocalStorage(
        'PurchaseOrderCart:expectedArrivalDate',
        undefined
      ) as unknown as RemovableRef<Date>,
      items: useLocalStorage('PurchaseOrderCart:items', []) as RemovableRef<PurchaseOrderItem[]>
    }
  },
  actions: {
    addItem() {},
    clearItem(name: string) {
      this.items = filter(this.items, (item) => item.name !== name)
    },
    setItemCount(item: string, count: number) {},
    place() {
      const authUserStore = usePurchaseOrderStore()
      this.$reset()
    }
  }
})
