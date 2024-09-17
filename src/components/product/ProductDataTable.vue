<script setup lang="ts">
import CommonDropdownMenu from '@/components/common/CommonDropdownMenu.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import type { Product } from '@/types/product'
const productStore = useProductStore()

const props = defineProps<{
  onClickDelete: (object: any) => void
  data: Product[]
  pagination?: {
    total?: number
    disablePagination?: boolean
    disableSearchBar?: boolean
  }
}>()

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.id)
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
  productStore.search(searchInput.value, pageIndex.value)
}, 1000)

const searchWithoutDebounce = () => {
  productStore.search(searchInput.value, pageIndex.value)
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
    placeholder="Filtre os Produtos"
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
