<script setup>
import { computed, ref } from "vue";
import GridCell from "./GridCell.vue";
import GameStatusPop from "./GameStatusPop.vue";

import { gridWidth, gridHeight, gridSet } from "@/utils/useCreateGrid";

const gridStyles = computed(() => {
  return [`grid-cols-ms${gridWidth.value}`, `grid-rows-ms${gridHeight.value}`];
});

const show = ref(true);
</script>

<template>
  <div class="grid relative" :class="gridStyles">
    <div v-for="(item, i) in gridSet" :key="i">
      <GridCell :item="item" :index="i" />
    </div>
    <GameStatusPop />
  </div>
</template>
