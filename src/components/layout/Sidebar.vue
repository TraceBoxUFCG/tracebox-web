<script setup lang="ts">
const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house'
  },
  {
    title: 'Fornecedores',
    to: '/suppliers',
    icon: 'lucide:users-round'
  }
]

const accountLinks = [
  {
    title: 'Profile',
    to: '/profile',
    icon: 'lucide:user'
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: 'lucide:settings'
  },
  {
    title: 'Sign out',
    to: '/signout',
    icon: 'lucide:log-out'
  }
]
</script>

<template>
  <aside
    class="fixed flex h-screen w-16 flex-col gap-2 border-r bg-muted/40 transition-[width] lg:w-52"
  >
    <RouterLink
      to="/ "
      class="flex h-16 shrink-0 items-center justify-between gap-1 border-b px-2 lg:px-4"
    >
      TraceBox
    </RouterLink>

    <nav class="relative flex h-full flex-col justify-between gap-2">
      <div>
        <SideBarLinks :links="links" />
      </div>

      <div class="border-y bg-background py-3 text-center">
        <SideBarLinks :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
