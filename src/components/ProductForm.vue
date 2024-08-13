<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UnitEnum } from '@/types/common'

defineProps<{
  onSubmit: (object: Supplier) => void
}>()
const stepIndex = ref(1)

const formSchema = [
  z.object({
    name: z.string(),
    average_unit_weight: z.number()
  }),
  z.object({
    quantity: z.number(),
    state: z.nativeEnum(UnitEnum)
  })
]

const steps = [
  {
    step: 1,
    title: 'Produto',
    description: 'Preencha Nome e Peso Médio do Produto.'
  },
  {
    step: 2,
    title: 'Endereço',
    description: 'Preencha o empacotamento de armazenamento do produto.'
  }
]
</script>

<template>
  <div>
    <SteppedForm
      :form-schema="formSchema"
      :steps="steps"
      v-model:step-index="stepIndex"
      :on-submit="onSubmit"
    >
      <template v-if="stepIndex === 1"> </template>

      <template v-if="stepIndex === 2"> Packaging Form </template>
    </SteppedForm>
  </div>
</template>
