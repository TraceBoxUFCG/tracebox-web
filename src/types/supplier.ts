export type Supplier = {
  document: string
  business_name: string
  id: number
  address: Address
}

export type Address = {
  city: string
  state: string
  street: string
  zipcode: any
  number: string
  complement: string
  latitude: number
  longitude: number
  id: number
}
