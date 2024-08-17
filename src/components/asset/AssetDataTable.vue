<script setup lang="ts">
import { AssetStatusEnum } from '@/types/assets'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'
import { debounce } from 'lodash'
import AssetDropDownMenu from './AssetDropDownMenu.vue'

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
    accessorKey: 'product',
    header: () => h('div', { class: 'text-left' }, 'Produto'),
    cell: ({ row }) => {
      const product = row.original.product ? row.original.product.name : '-'
      return h('div', { to: '', class: 'text-left font-medium' }, product)
    }
  },
  {
    accessorKey: 'packaging',
    header: () => h('div', { class: 'text-left' }, 'Empacotamento'),
    cell: ({ row }) => {
      const packaging = row.original.product ? row.original.product.packaging.description : '-'
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
const pageIndex = ref(1)
const searchInput = ref('')

const searchWithDebounce = debounce(() => {
  assetStore.search(searchInput.value, pageIndex.value)
}, 1000)

const searchWithoutDebounce = () => {
  assetStore.search(searchInput.value, pageIndex.value)
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
    placeholder="Filtre os assets"
    :columns="columns"
    :data="assetStore.assetsResponse"
  >
    <template v-slot:action>
      <slot />
    </template>
  </FilterableDataTable>
</template>
