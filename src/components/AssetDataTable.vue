<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

const assetStore = useAssetStore()

const statusMap = {
  DISABLED: 'Desabilitado',
  EMPTY: 'Vazío',
  OCCUPIED: 'Ocupado'
}

const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/assets/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.original.id
      )
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.status)
    }
  },
  {
    accessorKey: 'packaging',
    header: () => h('div', { class: 'text-left' }, 'Empacotamento'),
    cell: ({ row }) => {
      const packaging = row.original.packaging ? row.original.packaging.description : 'Asset Vazío'
      return h('div', { to: '', class: 'text-left font-medium' }, packaging)
    }
  }
]

const onSearch = async (input: string, page: number) => {
  await assetStore.search(input, page)
}
</script>

<template>
  <FilterableDataTable
    :on-search="onSearch"
    placeholder="Filtre os assets"
    :columns="columns"
    :data="assetStore.assetsResponse"
  >
    <slot />
  </FilterableDataTable>
</template>
