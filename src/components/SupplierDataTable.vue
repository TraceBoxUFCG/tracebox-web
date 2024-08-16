<script setup lang="ts">
import CommonDropdownMenu from '@/components/layout/CommonDropdownMenu.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const supplierStore = useSupplierStore()

const props = defineProps<{
  onClickDelete: (object: any) => void
}>()

const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: 'name',
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
    accessorKey: 'Documento',
    header: () => h('div', { class: 'text-left' }, 'Documento'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.document)
    }
  },
  {
    accessorKey: 'Cidade',
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

const onSearch = async (input: string, page: number) => {
  await supplierStore.search(input, page)
}
</script>

<template>
  <FilterableDataTable
    :on-search="onSearch"
    placeholder="Filtre os Fornecedores"
    :columns="columns"
    :data="supplierStore.suppliersResponse"
  >
    <slot />
  </FilterableDataTable>
</template>
