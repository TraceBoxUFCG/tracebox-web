<script setup lang="ts">
import CommonDropdownMenu from '@/components/common/CommonDropdownMenu.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'

const supplierStore = useSupplierStore()

const props = defineProps<{
  onClickDelete: (object: any) => void
  data: Supplier[]
  pagination?: {
    total?: number
    disablePagination?: boolean
    disableSearchBar?: boolean
  }
}>()

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h('div', row.original.id)
    }
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Nome'),
    cell: ({ row }) => {
      return h('div', row.original.business_name)
    }
  },
  {
    accessorKey: 'document',
    header: () => h('div', { class: 'text-left' }, 'Documento'),
    cell: ({ row }) => {
      return h('div', row.original.document)
    }
  },
  {
    accessorKey: 'city',
    header: () => h('div', { class: 'text-left' }, 'Cidade'),
    cell: ({ row }) => {
      return h('div', row.original.address.city)
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const supplier = row.original

      return h(
        'div',
        { class: 'relative' },
        h(CommonDropdownMenu, {
          id: supplier.id,
          onClickDelete: () => props.onClickDelete(supplier)
        })
      )
    }
  }
]

const pageIndex = ref(1)
const searchInput = ref('')

const searchWithDebounce = debounce(() => {
  supplierStore.search(searchInput.value, pageIndex.value)
}, 1000)

const searchWithoutDebounce = () => {
  supplierStore.search(searchInput.value, pageIndex.value)
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
    placeholder="Filtre os Fornecedores"
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
