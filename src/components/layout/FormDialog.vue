<script setup lang="ts">
defineProps({
  dialogTrigger: String,
  dialogTitle: String,
  dialogDescription: String
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> {{ dialogTrigger }} </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ dialogTitle }}</DialogTitle>
        <DialogDescription>
          {{ dialogDescription }}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
