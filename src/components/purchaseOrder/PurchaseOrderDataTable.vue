<script setup lang="ts">
import { PurchaseOrderStatusEnum } from '@/types/purchaseOrder'
import { type DateValue, getLocalTimeZone } from '@internationalized/date'
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import { RouterLink } from 'vue-router'
import StatusSelect from '../common/inputs/StatusSelect.vue'

const purchaseOrderStore = usePurchaseOrderStore()

const columns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'Id'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/purchase_order/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.original.id
      )
    }
  },
  {
    accessorKey: 'supplier',
    header: () => h('div', { class: 'text-left' }, 'Fornecedor'),
    cell: ({ row }) => {
      return h(
        'div',
        { to: '', class: 'text-left font-medium' },
        row.original.supplier.business_name
      )
    }
  },
  {
    accessorKey: 'expected_arrival_date',
    header: () => h('div', { class: 'text-left' }, 'Data de recebimento'),
    cell: ({ row }) => {
      return h(
        'div',
        { to: '', class: 'text-left font-medium' },
        row.original.expected_arrival_date
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
    accessorKey: 'items_quantity',
    header: () => h('div', { class: 'text-left' }, 'Quantidade de Items'),
    cell: ({ row }) => {
      return h('div', { to: '', class: 'text-left font-medium' }, row.original.items.length)
    }
  }
]

const pageIndex = ref(1)
const searchInput = ref('')
const expectedArrivalDate = ref<DateValue>()
const status = ref<PurchaseOrderStatusEnum>()

const searchWithDebounce = debounce(() => {
  purchaseOrderStore.search(
    pageIndex.value,
    searchInput.value,
    expectedArrivalDate.value?.toDate(getLocalTimeZone()),
    status.value
  )
}, 1000)

const searchWithoutDebounce = () => {
  purchaseOrderStore.search(
    pageIndex.value,
    searchInput.value,
    expectedArrivalDate.value?.toDate(getLocalTimeZone()),
    status.value
  )
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
    placeholder="Filtre as ordens por fornecedor"
    :columns="columns"
    :data="purchaseOrderStore.purchaseOrdersResponse"
  >
    <template v-slot:search>
      <DatePicker class="w-[200px]" v-model="expectedArrivalDate" />
      <StatusSelect class="w-[200px]" v-model="status" />
      <Button @click="searchWithoutDebounce">
        <iconify-icon lass="mr-3 size-4" icon="lucide:search" />
        Buscar
      </Button>
    </template>
    <template v-slot:action>
      <slot />
    </template>
  </FilterableDataTable>
</template>
