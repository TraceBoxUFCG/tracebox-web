<script setup lang="ts">
defineProps<{
  id: number
  onClickDelete: (object: any) => void
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
        @click="onClickDelete"
        class="w-full text-destructive hover:bg-destructive-foreground"
        as-child
      >
        <ConfirmDeleteDialog
          title="Você deseja deletar a entidade?"
          description="Essa é uma ação destrutiva e não existe retorno."
          :on-delete="onClickDelete"
        >
          <iconify-icon class="size-4" icon="lucide:trash" />
          Deletar
        </ConfirmDeleteDialog>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
