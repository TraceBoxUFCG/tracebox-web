<script setup lang="ts">
interface LinkProp {
  title: string
  icon: string
  to?: string
  children?: {
    title: string
    to: string
    icon: string
  }[]
}

defineProps<{
  routes: LinkProp[]
}>()
</script>

<template>
  <div v-for="route in routes" :key="route.title">
    <RouterLink
      v-if="route.to"
      exact-active-class="text-primary bg-muted"
      :to="route.to"
      class="flex items-center justify-center gap-3 px-4 py-2 text-muted-foreground transition-colors hover:text-primary lg:justify-normal"
    >
      <iconify-icon :icon="route.icon"></iconify-icon>
      <span class="hidden text-nowrap lg:block"> {{ route.title }} </span>
    </RouterLink>

    <div
      class="flex items-center justify-center gap-3 px-4 py-2 text-muted-foreground transition-colors hover:text-primary lg:justify-normal"
      v-else
    >
      <iconify-icon :icon="route.icon"></iconify-icon>
      <span class="hidden text-nowrap lg:block"> {{ route.title }} </span>
    </div>

    <div class="ml-3">
      <RouterLink
        v-for="link in route.children"
        :key="link.title"
        exact-active-class="text-primary bg-muted"
        :to="link.to"
        class="flex items-center justify-center gap-3 px-4 py-2 text-muted-foreground transition-colors hover:text-primary lg:justify-normal"
      >
        <iconify-icon :icon="link.icon"></iconify-icon>
        <span class="hidden text-nowrap lg:block"> {{ link.title }} </span>
      </RouterLink>
    </div>
  </div>
</template>
