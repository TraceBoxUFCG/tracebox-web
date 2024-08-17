<script setup lang="ts">
import { PurchaseOrderStatusEnum } from '@/types/purchaseOrder'
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import type { ColumnDef } from '@tanstack/vue-table'
import { debounce } from 'lodash'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'

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

const df = new DateFormatter('pt-br', {
  dateStyle: 'long'
})

const possibleStatus = [
  {
    label: 'Em Criação',
    value: PurchaseOrderStatusEnum.DRAFT
  },
  {
    label: 'Confirmado',
    value: PurchaseOrderStatusEnum.CONFIRMED
  },
  {
    label: 'Recebida',
    value: PurchaseOrderStatusEnum.RECEIVED
  },
  {
    label: 'Loteada',
    value: PurchaseOrderStatusEnum.LOTTED
  }
]
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
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :class="
              cn(
                'w-[300px] justify-start text-left font-normal',
                !expectedArrivalDate && 'text-muted-foreground'
              )
            "
          >
            <iconify-icon lass="mr-3 size-4" icon="lucide:calendar"></iconify-icon>
            {{
              expectedArrivalDate
                ? df.format(expectedArrivalDate.toDate(getLocalTimeZone()))
                : 'Data de Recebimento'
            }}
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar v-model="expectedArrivalDate" initial-focus />
        </PopoverContent>
      </Popover>

      <Select v-model="status">
        <SelectTrigger class="w-[300px]">
          <SelectValue placeholder="Selecione um status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status da ordem de compra</SelectLabel>
            <SelectItem v-for="status in possibleStatus" :key="status.value" :value="status.value">
              {{ status.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

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
