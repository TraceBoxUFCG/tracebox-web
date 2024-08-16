<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import CommonDropdownMenu from '@/components/layout/CommonDropdownMenu.vue'

const props = defineProps<{
  onClickDelete: (object: any) => void
}>()

const productVarietyStore = useProductVarietyStore()

const columns: ColumnDef<ProductVariety>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/catalog/product/variety${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.original.id
      )
    }
  },
  {
    accessorKey: 'Variedade',
    header: () => h('div', { class: 'text-left' }, 'Nome'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.name)
    }
  },
  {
    accessorKey: 'product',
    header: () => h('div', { class: 'text-left' }, 'Produto'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.product.name)
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
          onClickDelete: () => props.onClickDelete(product)
        })
      )
    }
  }
]

const onSearch = async (input: string, page: number) => {
  await productVarietyStore.search(input, page)
}
</script>

<template>
  <FilterableDataTable
    :on-search="onSearch"
    placeholder="Filtre os assets"
    :columns="columns"
    :data="productVarietyStore.productVarietiesResponse"
  >
    <slot />
  </FilterableDataTable>
</template>
