<script setup lang="ts">
import { Check, Circle } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { computed, h, ref } from 'vue'
import { get, set } from '@vueuse/core'
import { StatesEnum } from '@/types/supplier'

import { Form, FormField } from '@/components/ui/form'
const supplierStore = useSupplierStore()

import { toast } from '@/components/ui/toast'

const formSchema = [
  z.object({
    document: z.string().describe('CPF/CNPJ'),
    business_name: z.string().describe('Nome')
  }),
  z
    .object({
      zipcode: z
        .string()
        .regex(/^\d{5}-\d{3}$/, 'CEP inválido. O formato deve ser XXXXX-XXX.')
        .describe('CEP'),
      city: z.string().describe('Cidade'),
      state: z.nativeEnum(StatesEnum).describe('Estado'),
      street: z.string().describe('Rua'),
      number: z.string().describe('Número'),
      complement: z.string().describe('Complemento').optional()
    })
    .describe('Endereço')
]

const stepIndex = ref(1)
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

const canGoNext = computed(() => stepIndex.value < steps.length)
const canGoBack = computed(() => stepIndex.value > 1)
function goNext() {
  if (get(canGoNext)) {
    set(stepIndex, stepIndex.value + 1)
  }
}
function goBack() {
  if (get(canGoBack)) {
    set(stepIndex, stepIndex.value - 1)
  }
}

async function onSubmit(values: Supplier) {
  await supplierStore.createSupplier(values)
}
</script>

<template>
  <Form
    v-slot="{ meta, values, validate }"
    as=""
    keep-values
    :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
  >
    <form
      @submit="
        (e) => {
          e.preventDefault()
          validate()

          if (stepIndex === steps.length) {
            onSubmit(values)
          }
        }
      "
    >
      <Stepper v-model="stepIndex" class="flex w-full items-start gap-2">
        <StepperItem
          v-for="step in steps"
          :key="step.step"
          v-slot="{ state }"
          class="relative flex w-full flex-col items-center justify-center"
          :step="step.step"
        >
          <StepperSeparator
            v-if="step.step !== steps[steps.length - 1].step"
            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
          />

          <StepperTrigger as-child>
            <Button
              :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
              size="icon"
              class="z-10 shrink-0 rounded-full"
              :class="[
                state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
              ]"
              :disabled="state !== 'completed' && !meta.valid"
            >
              <Check v-if="state === 'completed'" class="size-5" />
              <Circle v-if="state === 'active'" />
            </Button>
          </StepperTrigger>

          <div class="mt-5 flex flex-col items-center text-center">
            <StepperTitle
              :class="[state === 'active' && 'text-primary']"
              class="text-sm font-semibold transition lg:text-base"
            >
              {{ step.title }}
            </StepperTitle>
            <StepperDescription
              :class="[state === 'active' && 'text-primary']"
              class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
            >
              {{ step.description }}
            </StepperDescription>
          </div>
        </StepperItem>
      </Stepper>

      <div class="mt-4 flex flex-col gap-4">
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
      </div>

      <div class="mt-4 flex items-center justify-between">
        <Button :disabled="!canGoBack" variant="outline" size="sm" @click="goBack"> Voltar </Button>
        <div class="flex items-center gap-3">
          <Button
            v-if="stepIndex !== 2"
            :type="meta.valid ? 'button' : 'submit'"
            :disabled="!canGoNext"
            size="sm"
            @click="meta.valid && goNext()"
          >
            Próximo
          </Button>
          <Button v-if="stepIndex === 2" size="sm" type="submit"> Salvar </Button>
        </div>
      </div>
    </form>
  </Form>
</template>
