<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import PurchaseOrderItemCartDropDownMenu from '@/components/purchaseOrder/cart/PurchaseOrderItemCartDropDownMenu.vue'

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
        row.original.product_variety.product.name
      )
    }
  },
  {
    accessorKey: 'variety',
    header: () => h('div', { class: 'text-left' }, 'Variedade'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.product_variety.name)
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
      const formatedPrice = `R$ ${row.original.unit_price}`
      return h('div', { to: '', class: 'text-left font-medium' }, formatedPrice)
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'relative' },
        h(PurchaseOrderItemCartDropDownMenu, {
          onClickRemove: () => purchaseOrderCartStore.clearItem(row.index)
        })
      )
    }
  }
]
</script>

<template>
  <DataTable class="w-full" :columns="columns" :data="purchaseOrderCartStore.items" />
</template>
