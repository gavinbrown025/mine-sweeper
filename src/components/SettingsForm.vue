<template>
  <form
    class="text-sm flex flex-col gap-2 w-min p-4 pb-6 rounded-md bg-gray-600"
    @submit.prevent="setNewGrid"
  >
    <label>Width</label>
    <input type="number" v-model="inputs.width" />

    <label>Height</label>
    <input type="number" v-model="inputs.height" />

    <label>Bombs</label>
    <input type="number" v-model="inputs.bombs" />

    <button type="submit" class="w-min p-2 bg-gray-500 rounded-md mt-1">
      Apply
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStorage } from "@vueuse/core";
import { resetGame } from "@/utils/useGameplay";
import { bombCount, gridWidth, gridHeight } from "@/utils/useCreateGrid";

// Limits
const maxWidth = 36;
const maxHeight = 44;

// Reactive grid state in localStorage
const grid = useStorage("grid-layout", { width: 12, height: 20, bombs: 20 });

// Input model
const inputs = ref({
  width: gridWidth.value,
  height: gridHeight.value,
  bombs: bombCount.value,
});

// Dynamic max bombs based on current grid dimensions
const maxBombs = computed(() => inputs.value.width * inputs.value.height);

// Apply new grid with clamped values
const setNewGrid = () => {
  const width = Math.min(inputs.value.width, maxWidth);
  const height = Math.min(inputs.value.height, maxHeight);
  const bombs = Math.min(inputs.value.bombs, width * height);

  const newGrid = { width, height, bombs };

  grid.value = newGrid;
  gridWidth.value = width;
  gridHeight.value = height;
  bombCount.value = bombs;

  inputs.value = { ...newGrid };

  resetGame();
};
</script>

<style scoped>
input {
  @apply text-gray-800 p-1 rounded-md;
}
</style>
