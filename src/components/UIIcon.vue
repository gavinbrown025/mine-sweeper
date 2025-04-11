<template>
  <span class="material-symbols-outlined"> {{ icon }} </span>
</template>

<script setup>
defineProps({ icon: { type: String, default: "" } });
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 20;

  &.fill {
    font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 20;
  }
}
</style>
