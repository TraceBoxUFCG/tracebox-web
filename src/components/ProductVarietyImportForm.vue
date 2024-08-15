<script setup lang="ts">
import * as z from 'zod'
const props = defineProps<{
  onSubmit: (file: File) => void
}>()

const file = ref<File>()
const isValidFile = ref<boolean>(false)

const fileValidation = z.instanceof(File).refine((file) => file.type === 'text/csv', {
  message: 'O arquivo deve ser um CSV'
})

const handleFileChange = (event: Event) => {
  const uploadedFile = (event.target as HTMLInputElement).files?.[0]
  const checkFile = uploadedFile && fileValidation.safeParse(uploadedFile).success

  if (checkFile) {
    file.value = uploadedFile
    isValidFile.value = true
  } else {
    isValidFile.value = false
  }
}

const handleSubmit = () => {
  if (file.value) {
    props.onSubmit(file.value)
  }

  file.value = undefined
}
</script>

<template>
  <div class="flex flex-col items-end gap-4">
    <Input
      class="w-full bg-muted text-primary"
      @change="handleFileChange"
      type="file"
      placeholder="Email"
    />
    <div>
      <Button @click="handleSubmit" :disabled="!isValidFile" type="submit"> Importar </Button>
    </div>
  </div>
</template>
