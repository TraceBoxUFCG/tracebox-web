<script setup lang="ts">
const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house'
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building-2'
  },
  {
    title: 'My Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check'
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
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <RouterLink
      to="/ "
      class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between"
    >
      TraceBox
    </RouterLink>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SideBarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SideBarLinks :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
