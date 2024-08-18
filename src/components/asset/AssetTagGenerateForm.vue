<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UnitEnum } from '@/types/common'

defineProps<{
  onSubmit: (object: GenerateAssetTagPayload) => void
}>()
const stepIndex = ref(1)

const formSchema = [
  z.object({
    quantity: z.number(),
    unit: z.nativeEnum(UnitEnum)
  })
]

const steps = [
  {
    step: 1,
    title: 'Assets',
    description: 'Preencha a quantidade de assets deseja gerar.'
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
      <template v-if="stepIndex === 1">
        <FormField v-slot="{ componentField }" name="quantity">
          <FormItem>
            <FormLabel>Quantidade de Assets</FormLabel>
            <CustomNumberInput class="gap-2" :min="1" :default-value="1" v-bind="componentField" />
            <FormMessage />
          </FormItem>
        </FormField>
      </template>
    </SteppedForm>
  </div>
</template>
