<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import { Pagination, PaginationList, PaginationListItem } from '@/components/ui/pagination'
import { get, set } from '@vueuse/core'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: PaginatedResponse
  pageIndex: number
  searchInput: string
  placeholder: string
}>()

const emit = defineEmits(['update:pageIndex', 'update:searchInput'])

const pageAux = toRef(props.pageIndex)
const searchInputAux = toRef(props.searchInput)

const canGoNext = computed(() => props.data.items.length < pageAux)
const canGoBack = computed(() => props.data.items.length > 1)

const goNext = () => {
  if (get(canGoNext)) {
    set(pageAux, pageAux.value + 1)
    emit('update:pageIndex', pageAux.value)
  }
}
const goBack = () => {
  if (get(canGoBack)) {
    set(pageAux, pageAux.value - 1)
    emit('update:pageIndex', pageAux.value)
  }
}
const setPage = (selectedPage: number) => {
  set(pageAux, selectedPage)
  emit('update:pageIndex', selectedPage)
}

const onInputChange = (input: string | number) => {
  set(searchInputAux, String(input))
  emit('update:searchInput', String(input))
}
</script>

<template>
  <div class="flex flex-col gap-5 px-5">
    <div class="flex items-center justify-between">
      <div class="flex flex-row gap-1">
        <Input
          v-on:update:model-value="onInputChange"
          :model-value="searchInputAux"
          class="w-[350px]"
          :placeholder="placeholder"
        />
        <slot name="search" />
      </div>
      <slot name="action" />
    </div>
    <div class="flex w-full flex-col items-center justify-center gap-5">
      <DataTable
        class="w-full"
        v-if="props.data.items"
        :columns="columns"
        :data="props.data.items"
      />
      <Pagination
        v-slot="{ page }"
        :total="props.data.total"
        :sibling-count="1"
        show-edges
        :default-page="1"
        class="flex w-full items-center justify-center"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev :onclick="goBack" />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                :click="
                  () => {
                    setPage(item.value)
                  }
                "
                class="size-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext :onclick="goNext" />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
