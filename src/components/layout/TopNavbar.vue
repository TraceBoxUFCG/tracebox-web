<script setup lang="ts"></script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex flex-col gap-2 px-6 justify-center items-end">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
</template>
