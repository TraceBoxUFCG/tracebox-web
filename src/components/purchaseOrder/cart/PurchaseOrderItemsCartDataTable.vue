<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'

const purchaseOrderCartStore = usePurchaseOrderCart()

const columns: ColumnDef<PurchaseOrderItem>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      const id = row.original.id || '-'
      return h('div', { to: '', class: 'text-left font-medium' }, id)
    }
  },
  {
    accessorKey: 'product_name',
    header: () => h('div', { class: 'text-left' }, 'Produto'),
    cell: ({ row }) => {
      return h(
        'div',
        { to: '', class: 'text-left font-medium' },
        row.original.productVariety.product.name
      )
    }
  },
  {
    accessorKey: 'boxes_quantity',
    header: () => h('div', { class: 'text-left' }, 'Quantidade de caixas'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.boxes_quantity)
    }
  },
  {
    accessorKey: 'unit_price',
    header: () => h('div', { class: 'text-left' }, 'Preço da caixa'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.unit_price)
    }
  }
]
</script>

<template>
  <DataTable class="w-full" :columns="columns" :data="purchaseOrderCartStore.items" />
</template>
