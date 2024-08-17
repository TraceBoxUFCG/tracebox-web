import type { Supplier } from './supplier'

import type { ProductVariety } from './productVariety'
export interface PurchaseOrder {
  expected_arrival_date: string
  status: string
  id: number
  supplier: Supplier
  items: PurchaseOrderItem[]
}

export interface PurchaseOrderItem {
  boxes_quantity: number
  unit_price: number
  id: number
  product_variety: ProductVariety
}
