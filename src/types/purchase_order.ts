import type { Supplier } from './supplier'
import type { ProductVariety } from './productVariety'

export enum PurchaseOrderStatusEnum {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  RECEIVED = 'RECEIVED',
  LOTTED = 'LOTTED'
}
export interface PurchaseOrder {
  expected_arrival_date: string
  status: PurchaseOrderStatusEnum
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
