<script setup>
import { onMounted } from "vue";
import { useStorage } from "@vueuse/core";
import GridContainer from "./GridContainer.vue";
import GameHeader from "./GameHeader.vue";

import {
  initializeGrid,
  bombCount,
  gridWidth,
  gridHeight,
} from "@/utils/useCreateGrid";

const grid = useStorage("grid-layout", { width: 12, height: 20, bombs: 20 });
onMounted(() => {
  gridWidth.value = grid.value.width;
  gridHeight.value = grid.value.height;
  bombCount.value = grid.value.bombs;
  initializeGrid();
});
</script>

<template>
  <div class="grid place-items-center">
    <GameHeader />
    <GridContainer />
  </div>
</template>
