<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { cn } from '@/lib/utils'

const model = defineModel<DateValue>()

const df = new DateFormatter('pt-br', {
  dateStyle: 'long'
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('w-[300px] justify-start text-left font-normal', !model && 'text-muted-foreground')
        "
      >
        <iconify-icon lass="mr-3 size-4" icon="lucide:calendar"></iconify-icon>
        {{ model ? df.format(model.toDate(getLocalTimeZone())) : 'Data de Recebimento' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="model" initial-focus />
    </PopoverContent>
  </Popover>
</template>
