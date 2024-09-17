<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import type { Stock } from '@/types/stock'
import { RouterLink } from 'vue-router'

const stockStore = useStockStore()

defineProps<{
  data: Stock[]
  pagination?: {
    total?: number
    disablePagination?: boolean
    disableSearchBar?: boolean
  }
}>()

const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/stock/item/${row.original.product.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.original.product.name
      )
    }
  },
  {
    accessorKey: 'quantity',
    header: () => h('div', { class: 'text-left' }, 'Quantidade'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.quantity)
    }
  },
  {
    accessorKey: 'unit',
    header: () => h('div', { class: 'text-left' }, 'Unidade'),
    cell: ({ row }) => {
      return h(
        'div',
        { to: '', class: 'text-left font-medium' },
        row.original.product.packaging.unit
      )
    }
  }
]

const pageIndex = ref(1)
const searchInput = ref('')

const searchWithDebounce = debounce(() => {
  stockStore.search(searchInput.value, pageIndex.value)
}, 1000)

const searchWithoutDebounce = () => {
  stockStore.search(searchInput.value, pageIndex.value)
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
    placeholder="Filtre os produtos em estoque"
    :columns="columns"
    :data="data"
    :disable-pagination="pagination?.disablePagination"
    :disable-search-bar="pagination?.disableSearchBar"
    :total-item="pagination?.total"
  >
  </FilterableDataTable>
</template>
