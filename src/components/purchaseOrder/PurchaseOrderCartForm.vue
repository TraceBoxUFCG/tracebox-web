<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { cn } from '@/lib/utils'

const expectedArrivalDate = ref<DateValue>()

const df = new DateFormatter('pt-br', {
  dateStyle: 'long'
})
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Ordens de Compra</CardTitle>
      <CardDescription>Adicione os dados para a ordem de compra</CardDescription>
    </CardHeader>
    <CardContent>
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
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button>Adicionar item</Button>
    </CardFooter>
  </Card>
</template>
