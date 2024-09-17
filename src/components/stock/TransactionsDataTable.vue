<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import type { Transaction } from '@/types/stock'

defineProps<{
  data: Transaction[]
  pagination?: {
    total?: number
    disablePagination?: boolean
    disableSearchBar?: boolean
  }
}>()

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'type',
    header: () => h('div', { class: 'text-left' }, 'Tipo'),
    cell: ({ row }) => {
      const formattedType = row.original.type === 'ENTRY' ? 'Entrada' : 'Saída'
      return h('div', formattedType)
    }
  },
  {
    accessorKey: 'quantity',
    header: () => h('div', { class: 'text-left' }, 'Quantidade'),
    cell: ({ row }) => {
      const signal = row.original.type === 'ENTRY' ? '+' : '-'
      const unit = row.original.packaging.unit
      return h('div', `${signal} ${row.original.quantity}${unit}`)
    }
  },
  {
    accessorKey: 'box',
    header: () => h('div', { class: 'text-left' }, 'Caixa'),
    cell: ({ row }) => {
      return h('div', row.original.meta.entry.from.asset.id)
    }
  },
  {
    accessorKey: 'transactionDateTime',
    header: () => h('div', { class: 'text-left' }, 'Data da Transação'),
    cell: ({ row }) => {
      const date = new Date(row.original.meta.entry.from.created_at)
      const formattedDate = date.toLocaleDateString('pt-BR')
      return h('div', formattedDate)
    }
  }
]

const pageIndex = ref(1)
const searchInput = ref('')
</script>

<template>
  <FilterableDataTable
    v-model:search-input="searchInput"
    v-model:page-index="pageIndex"
    placeholder=""
    :columns="columns"
    :data="data"
    :disable-pagination="pagination?.disablePagination"
    :disable-search-bar="pagination?.disableSearchBar"
    :total-item="pagination?.total"
  >
  </FilterableDataTable>
</template>
