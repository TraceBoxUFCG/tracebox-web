<script setup lang="ts">
import CommonDropdownMenu from '@/components/layout/main/CommonDropdownMenu.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import { RouterLink } from 'vue-router'

const supplierStore = useSupplierStore()

const props = defineProps<{
  onClickDelete: (object: any) => void
}>()

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/supplliers/${row.original.id}`,
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
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.business_name)
    }
  },
  {
    accessorKey: 'document',
    header: () => h('div', { class: 'text-left' }, 'Documento'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.document)
    }
  },
  {
    accessorKey: 'city',
    header: () => h('div', { class: 'text-left' }, 'Cidade'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.address.city)
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
    :data="supplierStore.suppliersResponse"
  >
    <template v-slot:action>
      <slot />
    </template>
  </FilterableDataTable>
</template>
