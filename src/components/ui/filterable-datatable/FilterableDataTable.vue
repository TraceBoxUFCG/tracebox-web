<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import { Pagination, PaginationList, PaginationListItem } from '@/components/ui/pagination'

import { debounce } from 'lodash'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: PaginatedResponse
  placeholder?: string
  onSearch: (input: string, page: number) => void
}>()

const searchInput = ref('')
const currentPage = ref(1)

const searchWithDebounce = debounce(() => {
  props.onSearch(searchInput.value, currentPage.value)
}, 1000)

const searchWithoutDebouce = () => {
  props.onSearch(searchInput.value, currentPage.value)
}
</script>

<template>
  <div class="flex flex-col gap-5 px-5">
    <div class="flex items-center justify-between">
      <Input
        :onchange="searchWithDebounce"
        :model-value="searchInput"
        @update:model-value="
          (input) => {
            searchInput = String(input)
            searchWithDebounce()
          }
        "
        class="max-w-sm"
        :placeholder="placeholder"
      />
      <slot />
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
        :default-page="currentPage"
        class="flex w-full items-center justify-center"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                :onclick="
                  () => {
                    if (currentPage !== item.value) {
                      currentPage = item.value
                      searchWithoutDebouce()
                    }
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

          <PaginationNext
            :onclick="
              () => {
                if (items.length < currentPage) {
                  currentPage = currentPage + 1
                  searchWithoutDebouce()
                }
              }
            "
          />
          <PaginationLast
            :onclick="
              () => {
                if (items.length > 1) {
                  currentPage = currentPage + 1
                  searchWithoutDebouce()
                }
              }
            "
          />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
