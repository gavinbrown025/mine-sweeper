<template>
  <form
    class="text-sm flex flex-col gap-2 w-min p-4 pb-6 rounded-md bg-gray-600"
    @submit.prevent="setNewGrid"
  >
    <div v-for="(input, key) in inputs" :key="key">
      <label>{{ key }}</label>
      <input
        type="number"
        v-model="inputs[key]"
        class="text-gray-800 p-1 rounded-md"
      />
    </div>

    <label
      v-for="(value, key) in difficultySettings"
      :key="key"
      class="flex gap-1 items-center"
    >
      <input
        type="radio"
        name="difficulty"
        :value="value"
        v-model="selectedDifficulty"
      />
      {{ key }}
    </label>

    <button type="submit" class="w-min p-2 bg-gray-500 rounded-md mt-1">
      Apply
    </button>
  </form>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStorage } from "@vueuse/core";
import { resetGame } from "@/utils/useGameplay";
import { bombCount, gridWidth, gridHeight } from "@/utils/useCreateGrid";

const grid = useStorage("grid-settings", { width: 12, height: 20, bombs: 20 });
const inputs = ref({ ...grid.value });

const difficultySettings = ref({ easy: 0.1, medium: 0.18, hard: 0.24 });
const selectedDifficulty = ref(difficultySettings.value.easy);

// Dynamic max bombs based on current grid dimensions
const gridSize = computed(() => inputs.value.width * inputs.value.height);
const maxBombs = computed(() => Math.floor(gridSize.value * 0.5));
const minBombs = computed(() => Math.floor(gridSize.value * 0.05));

watch(selectedDifficulty, (difficulty) => {
  inputs.value.bombs = Math.floor(gridSize.value * difficulty);
});


// Apply new grid with clamped values
const setNewGrid = () => {
  const width = Math.max(10, Math.min(inputs.value.width, 44));
  const height = Math.max(12, Math.min(inputs.value.height, 48));
  const bombs = Math.max(
    minBombs.value,
    Math.min(inputs.value.bombs, maxBombs.value)
  );

  const newGrid = { width, height, bombs };
  grid.value = newGrid;
  inputs.value = { ...newGrid };

  gridWidth.value = width;
  gridHeight.value = height;
  bombCount.value = bombs;
  resetGame();
};
</script>
