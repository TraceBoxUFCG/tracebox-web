<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import { Pagination, PaginationList } from '@/components/ui/pagination'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: PaginatedResponse
  placeholder?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-5 px-5">
    <div class="flex items-center justify-between">
      <Input model-value="" class="max-w-sm" :placeholder="placeholder" />
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
        :default-page="1"
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
              <Button class="size-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
