<script setup lang="ts">
import { ref } from 'vue'
import { ChevronsUpDown } from 'lucide-vue-next'

import { debounce } from 'lodash'

import type { AxiosInstance } from 'axios'

const axios = inject<AxiosInstance>('axios') as AxiosInstance
const open = ref(false)
const selectedVariety = defineModel<ProductVariety>('variety', { required: true })
const providedVarieties = ref<ProductVariety[]>([])

;(async () => {
  const response = (
    await axios.get('catalog/product_variety', {
      params: {
        page: 1,
        size: 10
      }
    })
  ).data
  providedVarieties.value = response.items
})()

const productVarietyToSearch = computed(() => {
  return providedVarieties.value.map((variety: ProductVariety) => {
    return {
      label: variety.name,
      value: variety
    }
  })
})

const onInputChange = debounce(async (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  const searchParam = target.value
  const response: PaginatedResponse<ProductVariety> = (
    await axios.get('/catalog/product_variety', {
      params: {
        q: searchParam,
        page: 1,
        size: 10
      }
    })
  ).data
  providedVarieties.value = response.items
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
        {{ selectedVariety ? selectedVariety.name : 'Selecione o produto' }}
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[350px] p-0">
      <Command>
        <CommandInput
          :oninput="onInputChange"
          class="h-9"
          placeholder="Procure a variedade do produto"
        />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="variety in productVarietyToSearch"
              :key="variety.label"
              :value="variety.value"
              @select="
                (e) => {
                  selectedVariety = e.detail.value
                  open = false
                }
              "
            >
              <div class="flex flex-col">
                <span>{{ variety.label }}</span>
                <span class="px-2 text-primary"> {{ variety.value.product.name }}</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
