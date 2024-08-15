<script setup lang="ts">
import { AssetStatusEnum } from '@/types/assets'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import AssetDropDownMenu from './layout/AssetDropDownMenu.vue'

const assetStore = useAssetStore()

const statusMap: { [key in string]: string } = {
  [AssetStatusEnum.EMPTY]: 'Vazío',
  [AssetStatusEnum.OCCUPIED]: 'Ocupado',
  [AssetStatusEnum.DISABLED]: 'Desabilitado'
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
      const asset: Asset = row.original
      const status = statusMap[asset.status]
      return h('div', { to: '', class: 'text-left font-medium' }, status)
    }
  },
  {
    accessorKey: 'packaging',
    header: () => h('div', { class: 'text-left' }, 'Empacotamento'),
    cell: ({ row }) => {
      const packaging = row.original.packaging ? row.original.packaging.description : 'Asset Vazío'
      return h('div', { to: '', class: 'text-left font-medium' }, packaging)
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const asset = row.original

      return h(
        'div',
        { class: 'relative' },
        h(AssetDropDownMenu, {
          id: asset.id,
          onClickDownload: () => () => {}
        })
      )
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
