<script setup>
import { onMounted } from "vue";
import { useStorage } from "@vueuse/core";
import GridContainer from "./GridContainer.vue";
import GameHeader from "./GameHeader.vue";
import SettingsForm from "./SettingsForm.vue";

import {
  initializeGrid,
  bombCount,
  gridWidth,
  gridHeight,
} from "@/utils/useCreateGrid";

const grid = useStorage("grid-settings", {
  difficulty: "easy",
  size: "medium",
  width: 12,
  height: 20,
  mines: 20,
});
onMounted(() => {
  gridWidth.value = grid.value.width;
  gridHeight.value = grid.value.height;
  bombCount.value = grid.value.mines;
  initializeGrid();
});
</script>

<template>
  <div class="grid grid-cols-[auto,1fr]">
    <GameHeader class="col-span-2" />
    <GridContainer class="col-start-1" />
    <SettingsForm class="col-start-2" />
  </div>
</template>
