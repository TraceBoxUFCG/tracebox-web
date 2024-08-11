<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const supplierStore = useSupplierStore()

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
    accessorKey: 'Documento',
    header: () => h('div', { class: 'text-left' }, 'Cidade'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.address.city)
    }
  }
]
</script>

<template>
  <DataTable v-if="supplierStore.suppliers" :columns="columns" :data="supplierStore.suppliers" />
</template>
