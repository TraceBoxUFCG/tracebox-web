<script setup lang="ts">
import { AssetStatusEnum } from '@/types/assets'
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import AssetDropDownMenu from './AssetDropDownMenu.vue'
import type { Asset } from '@/types/assets'

const assetStore = useAssetStore()
const props = defineProps<{
  data: Asset[]
  pagination?: {
    total?: number
    disablePagination?: boolean
    disableSearchBar?: boolean
  }
  disableActions?: boolean
}>()

const statusMap: { [key in string]: string } = {
  [AssetStatusEnum.EMPTY]: 'Vazío',
  [AssetStatusEnum.OCCUPIED]: 'Ocupado',
  [AssetStatusEnum.DISABLED]: 'Desabilitado'
}

const columns = computed(() => {
  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: 'id',
      header: () => h('div', { class: 'text-left' }, 'Id'),
      cell: ({ row }) => {
        return h('div', { to: '', class: 'text-left font-medium' }, row.original.id)
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
    }
  ]

  if (!props.disableActions) {
    columns.push({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const asset = row.original

        return h(
          'div',
          { class: 'relative' },
          h(AssetDropDownMenu, {
            id: asset.id as number,
            onClickDownload: () => assetStore.getTagById(asset.id as number)
          })
        )
      }
    })
  }

  return columns
})
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
