<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const pageStore = usePageStore()
const supplierStore = useSupplierStore()

pageStore.title = 'Fornecedores'
supplierStore.fill()

const schema = z.object({
  document: z.string().describe('CPF/CNPJ'),
  business_name: z.string().describe('Nome'),
  address: z
    .object({
      zipcode: z.string().describe('CEP'),
      city: z.string().describe('Cidade'),
      state: z.nativeEnum(StatesEnum).describe('Estado'),
      street: z.string().describe('Rua'),
      number: z.number().describe('Número'),
      complement: z.string().describe('Complemento').optional()
    })
    .describe('Endereço')
})

const form = useForm({
  validationSchema: toTypedSchema(schema)
})
</script>

<template>
  <div class="flex flex-col items-end justify-center">
    <AutoForm :form="form" :schema="schema" />
  </div>
  <SupplierDataTable />
</template>
