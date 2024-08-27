<script setup lang="ts">
defineProps<{
  id: number
  onClickDownload: () => void
}>()
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
      <DropdownMenuSeparator />
      <DropdownMenuItem
        @click="onClickDownload"
        class="w-full text-primary hover:bg-destructive-foreground"
      >
        <iconify-icon class="size-4" icon="lucide:check" />
        Confirmar Ordem de compra
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
