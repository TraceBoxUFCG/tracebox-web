<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UnitEnum } from '@/types/common'

defineProps<{
  onSubmit: (object: Product) => void
}>()
const stepIndex = ref(1)

const formSchema = [
  z.object({
    name: z.string(),
    average_unit_weight: z.number()
  }),
  z.object({
    quantity: z.number(),
    unit: z.nativeEnum(UnitEnum)
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
      <template v-if="stepIndex === 1">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Nome do Produto</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="average_unit_weight">
          <FormItem>
            <FormLabel>Peso Médio</FormLabel>
            <NumberField
              class="gap-2"
              :min="0"
              :default-value="0.1"
              :format-options="{
                signDisplay: 'exceptZero',
                minimumFractionDigits: 2
              }"
              v-bind="componentField"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <FormControl>
                  <NumberFieldInput />
                </FormControl>
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
            <FormMessage />
          </FormItem>
        </FormField>
      </template>

      <template v-if="stepIndex === 2">
        <FormField v-slot="{ componentField }" name="packaging.quantity">
          <FormItem>
            <FormLabel>Quantidade que cabe na caixa</FormLabel>
            <NumberField
              class="gap-2"
              :min="0"
              :default-value="0.1"
              :format-options="{
                signDisplay: 'exceptZero',
                minimumFractionDigits: 1
              }"
              v-bind="componentField"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <FormControl>
                  <NumberFieldInput />
                </FormControl>
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="packaging.unit">
          <FormItem v-auto-animate>
            <FormLabel>Unidade</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a unidade do empacotamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unidade</SelectLabel>
                    <SelectItem v-for="unit of UnitEnum" :key="unit" :value="unit">
                      {{ unit }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </template>
    </SteppedForm>
  </div>
</template>
