<script setup lang="ts">
import CommonDropdownMenu from '@/components/layout/CommonDropdownMenu.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const productStore = useProductStore()

const props = defineProps<{
  onClickUpdate: (object: any) => void
  onClickDelete: (object: any) => void
}>()

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/product/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.original.id
      )
    }
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Nome'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.name)
    }
  },
  {
    accessorKey: 'average_unit_weight',
    header: () => h('div', { class: 'text-left' }, 'Peso médio'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.average_unit_weight)
    }
  },
  {
    accessorKey: 'packaging',
    header: () => h('div', { class: 'text-left' }, 'Empacotamento de Recebimento'),
    cell: ({ row }) => {
      return h(
        'div',
        { to: '', class: 'text-left font-medium' },
        row.original.packaging.description
      )
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original

      return h(
        'div',
        { class: 'relative' },
        h(CommonDropdownMenu, {
          id: product.id,
          onClickUpdate: () => props.onClickUpdate(product),
          onClickDelete: () => props.onClickDelete(product)
        })
      )
    }
  }
]

const onSearch = async (input: string, page: number) => {
  await productStore.search(input, page)
}
</script>

<template>
  <FilterableDataTable
    :on-search="onSearch"
    placeholder="Filtre os Produtos"
    :columns="columns"
    :data="productStore.productsResponse"
  >
    <slot />
  </FilterableDataTable>
</template>
