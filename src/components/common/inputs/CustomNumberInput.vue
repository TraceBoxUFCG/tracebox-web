<script setup lang="ts">
import {
  useForwardPropsEmits,
  type NumberFieldInputProps,
  type NumberFieldRootEmits,
  type NumberFieldRootProps
} from 'radix-vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<
  NumberFieldRootProps & { class?: HTMLAttributes['class'] } & NumberFieldInputProps
>()
const emits = defineEmits<NumberFieldRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NumberField class="w-auto" v-bind="forwarded">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
