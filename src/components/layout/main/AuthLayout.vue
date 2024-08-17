<script setup lang="ts">
const pageStore = usePageStore()
</script>

<template>
  <Sidebar />
  <div class="ml-16 flex flex-col transition-[margin] lg:ml-60">
    <TopNavbar />

    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageStore.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
