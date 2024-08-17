<script setup lang="ts">
import { PurchaseOrderStatusEnum } from '@/types/purchase_order'
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import { RouterLink } from 'vue-router'

const purchaseOrderStore = usePurchaseOrderStore()

const columns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/purchase_order/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.original.id
      )
    }
  },
  {
    accessorKey: 'supplier',
    header: () => h('div', { class: 'text-left' }, 'Fornecedor'),
    cell: ({ row }) => {
      return h(
        'div',
        { to: '', class: 'text-left font-medium' },
        row.original.supplier.business_name
      )
    }
  },
  {
    accessorKey: 'expected_arrival_date',
    header: () => h('div', { class: 'text-left' }, 'Data de recebimento'),
    cell: ({ row }) => {
      return h(
        'div',
        { to: '', class: 'text-left font-medium' },
        row.original.expected_arrival_date
      )
    }
  },
  {
    accessorKey: 'items_quantity',
    header: () => h('div', { class: 'text-left' }, 'Quantidade de Items'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.items.length)
    }
  }
]

const pageIndex = ref(1)
const searchInput = ref('')

const searchWithDebounce = debounce(() => {
  purchaseOrderStore.search(pageIndex.value, searchInput.value)
}, 1000)

const searchWithoutDebounce = () => {
  purchaseOrderStore.search(
    pageIndex.value,
    searchInput.value,
    new Date(),
    PurchaseOrderStatusEnum.DRAFT
  )
}

watch(searchInput, () => {
  searchWithDebounce()
})

watch(pageIndex, () => {
  searchWithoutDebounce()
})
</script>

<template>
  <FilterableDataTable
    v-model:search-input="searchInput"
    v-model:page-index="pageIndex"
    placeholder="Filtre as ordens por fornecedor"
    :columns="columns"
    :data="purchaseOrderStore.purchaseOrdersResponse"
  >
  </FilterableDataTable>
</template>
