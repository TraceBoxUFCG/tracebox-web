<script setup lang="ts">
defineProps<{
  onClickRemove: (object: any) => void
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
        @click="onClickRemove"
        class="w-full text-destructive hover:bg-destructive-foreground"
      >
        <iconify-icon class="mr-2 size-4" icon="lucide:minus" />
        Remover Item
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
