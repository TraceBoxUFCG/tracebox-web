import type { Product } from './product'
import type { Packaging } from './product'
import type { Asset } from './assets'

export type Stock = {
  quantity: number
  product: Product
}

export type TransactionMetaEntry = {
  from: number
}

export type TransactionMeta = {
  entry: TransactionMetaEntry
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
