import type { Supplier } from './supplier'
import type { ProductVariety } from './productVariety'

export enum PurchaseOrderStatusEnum {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  RECEIVED = 'RECEIVED',
  LOTTED = 'LOTTED'
}
export type PurchaseOrder = {
  id?: number
  expected_arrival_date: string
  status: PurchaseOrderStatusEnum
  supplier: Supplier
  items: PurchaseOrderItem[]
}

export type PurchaseOrderItem = {
  id?: number
  boxes_quantity: number
  unit_price: number
  product_variety: ProductVariety
}

export type PurchaseOrderItemCart = {
  id?: number
  purchase_order_id?: number
  boxes_quantity: number
  unit_price: number
  product_variety_id: number
}

export type PurchaseOrderCart = {
  id?: number
  expected_arrival_date: Date
  supplier_id: number
  items: PurchaseOrderItemCart[]
}
