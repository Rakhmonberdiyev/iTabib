<script setup lang="ts">

import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
<Sidebar />
  <div class="p-4 sm:ml-64">
  <slot></slot>
  </div>
</template>

<style scoped>

</style>
