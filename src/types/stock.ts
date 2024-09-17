import type { Product } from './product'
import type { Packaging } from './product'
import type { Asset } from './assets'
import type { ReceivementItem } from './receivement_item'

export type Stock = {
  quantity: number
  product: Product
}

export type TransactionMetaEntry = {
  receivement_item_id: number
  asset_id: number
  id: number
  receivement_item: ReceivementItem
  asset: Asset
  created_at: string
}

export type TransactionMeta = {
  entry: {
    from: TransactionMetaEntry
  }
}

export type Transaction = {
  quantity: number
  product_id: number
  packaging_id: number
  type: string
  meta: TransactionMeta
  id: number
  product: Product
  packaging: Packaging
}

export type StockDetails = {
  stock: Stock
  transactions: Transaction[]
  assets: Asset[]
}
