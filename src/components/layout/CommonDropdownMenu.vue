<script setup lang="ts">
defineProps<{
  id: string
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 p-0">
        <span class="sr-only">Open menu</span>
        <iconify-icon class="size-4" icon="lucide:more-horizontal" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Ações</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(id)"> Editar </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="text-destructive hover:bg-destructive-foreground">
        <iconify-icon class="size-4" icon="lucide:trash" />
        Deletar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
