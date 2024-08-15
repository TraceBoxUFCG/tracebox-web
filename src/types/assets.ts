import type { Packaging } from './product'

export enum AssetStatusEnum {
  EMPTY = 'EMPTY',
  OCCUPIED = 'OCCUPIED',
  DISABLED = 'DISABLED'
}

export type Asset = {
  id?: number
  status: AssetStatusEnum
  packaging?: Packaging
}

export type GenerateAssetTagPayload = {
  quantity: number
}
