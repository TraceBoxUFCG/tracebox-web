import axios from 'axios'
import type { AxiosInstance } from 'axios'
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    axios: AxiosInstance
  }
}

export function PiniaAxiosPlugin() {
  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {}
  })
  return {
    axios: axiosClient
  }
}
