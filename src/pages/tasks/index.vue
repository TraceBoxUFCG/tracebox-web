<script setup lang="ts">
import { usePageStore } from '@/stores/page'
usePageStore().pageData.title = 'Tasks'
</script>

<template>
  <h1>Tasks</h1>
</template>
