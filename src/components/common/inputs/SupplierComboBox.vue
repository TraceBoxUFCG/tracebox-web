<script setup lang="ts">
import { ref } from 'vue'
import { ChevronsUpDown } from 'lucide-vue-next'

import { debounce } from 'lodash'

import type { AxiosInstance } from 'axios'

const axios = inject<AxiosInstance>('axios') as AxiosInstance
const open = ref(false)
const selectedSupplier = defineModel<Supplier>('supplier', { required: true })
const providedSuppliers = ref<Supplier[]>([])

;(async () => {
  const response = (
    await axios.get('/supplier', {
      params: {
        page: 1,
        size: 10
      }
    })
  ).data
  providedSuppliers.value = response.items
})()

const suppliersToSearch = computed(() => {
  return providedSuppliers.value.map((supplier: Supplier) => {
    return {
      label: supplier.business_name,
      value: supplier
    }
  })
})

const onInputChange = debounce(async (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  const searchParam = target.value
  const response: PaginatedResponse<Supplier> = (
    await axios.get('/supplier', {
      params: {
        q: searchParam,
        page: 1,
        size: 10
      }
    })
  ).data
  providedSuppliers.value = response.items
}, 500)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        {{ selectedSupplier ? selectedSupplier.business_name : 'Selecione o fornecedor' }}
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[350px] p-0">
      <Command>
        <CommandInput :oninput="onInputChange" class="h-9" placeholder="Procure por fornecedores" />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="supplier in suppliersToSearch"
              :key="supplier.label"
              :value="supplier.value"
              @select="
                (e) => {
                  selectedSupplier = e.detail.value
                  open = false
                }
              "
            >
              {{ supplier.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
