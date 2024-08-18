<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { cn } from '@/lib/utils'
import { useForwardPropsEmits, type CalendarRootEmits, type CalendarRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

const model = defineModel<DateValue>()

const df = new DateFormatter('pt-br', {
  dateStyle: 'long'
})

const props = defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-full justify-start text-left font-normal',
            !model && 'text-muted-foreground',
            props.class
          )
        "
      >
        <iconify-icon lass="mr-3 size-4" icon="lucide:calendar"></iconify-icon>
        {{ model ? df.format(model.toDate(getLocalTimeZone())) : 'Data de Recebimento' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-bind="forwarded" initial-focus />
    </PopoverContent>
  </Popover>
</template>
