import type { Supplier } from './supplier'
import type { ProductVariety } from './productVariety'

export enum PurchaseOrderStatusEnum {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  RECEIVED = 'RECEIVED',
  LOTTED = 'LOTTED'
}
export interface PurchaseOrder {
  id?: number
  expected_arrival_date: string
  status: PurchaseOrderStatusEnum
  supplier: Supplier
  items: PurchaseOrderItem[]
}

export interface PurchaseOrderItem {
  id?: number
  boxes_quantity: number
  unit_price: number
  product_variety: ProductVariety
}
