import type { PurchaseOrderItem } from './purchaseOrder'

export type ReceivementItem = {
  purchase_order_item_id: number
  status: string
  received_quantity: number
  rejected_quantity: number
  id: number
  purchase_order_item: PurchaseOrderItem
}
