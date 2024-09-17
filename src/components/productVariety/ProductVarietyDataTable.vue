<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import CommonDropdownMenu from '@/components/common/CommonDropdownMenu.vue'
import { debounce } from 'lodash'
import type { ProductVariety } from '@/types/productVariety'

const props = defineProps<{
  onClickDelete: (object: any) => void
  data: ProductVariety[]
  pagination?: {
    total?: number
    disablePagination?: boolean
    disableSearchBar?: boolean
  }
}>()

const productVarietyStore = useProductVarietyStore()

const columns: ColumnDef<ProductVariety>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.id)
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
          id: product.id as number,
          onClickDelete: () => props.onClickDelete(product)
        })
      )
    }
  }
]

const pageIndex = ref(1)
const searchInput = ref('')

const searchWithDebounce = debounce(() => {
  productVarietyStore.search(searchInput.value, pageIndex.value)
}, 1000)

const searchWithoutDebounce = () => {
  productVarietyStore.search(searchInput.value, pageIndex.value)
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
    placeholder="Filtre as variedades de produto"
    :columns="columns"
    :data="data"
    :disable-pagination="pagination?.disablePagination"
    :disable-search-bar="pagination?.disableSearchBar"
    :total-item="pagination?.total"
  >
    <template v-slot:action>
      <slot />
    </template>
  </FilterableDataTable>
</template>
