<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { StatesEnum } from '@/types/common'

defineProps<{
  onSubmit: (object: Supplier) => void
}>()
const stepIndex = ref(1)

const formSchema = [
  z.object({
    document: z.string(),
    business_name: z.string()
  }),
  z.object({
    zipcode: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido. O formato deve ser XXXXX-XXX.'),
    city: z.string(),
    state: z.nativeEnum(StatesEnum),
    street: z.string(),
    number: z.string(),
    complement: z.string().describe('Complemento').optional()
  })
]

const steps = [
  {
    step: 1,
    title: 'Fornecedor',
    description: 'Preencha CNPJ e Nome do Fornecedor.'
  },
  {
    step: 2,
    title: 'Endereço',
    description: 'Preencha o endereço do Fornecedor.'
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
        <FormField v-slot="{ componentField }" name="document">
          <FormItem v-auto-animate>
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              <Input :mask="'##.###.###/000#-##'" type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="business_name">
          <FormItem v-auto-animate>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </template>

      <template v-if="stepIndex === 2">
        <FormField v-slot="{ componentField }" name="address.zipcode">
          <FormItem v-auto-animate>
            <FormLabel>CEP</FormLabel>
            <FormControl>
              <Input mask="#####-###" type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="address.city">
          <FormItem v-auto-animate>
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="address.state">
          <FormItem v-auto-animate>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estado</SelectLabel>
                    <SelectItem v-for="state of StatesEnum" :key="state" :value="state">
                      {{ state }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="address.street">
          <FormItem v-auto-animate>
            <FormLabel>Rua</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="address.number">
          <FormItem v-auto-animate>
            <FormLabel>Número</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="address.complement">
          <FormItem v-auto-animate>
            <FormLabel>Complemento</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </template>
    </SteppedForm>
  </div>
</template>
