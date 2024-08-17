<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
defineOptions({
  inheritAttrs: false
})
const props = defineProps<{
  class?: HTMLAttributes['class']
  title: string
  description: string
  onDelete: (object: any) => void
}>()
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger :class="props.class">
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ props.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ props.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction :onclick="onDelete">Continuar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
