<template>
  <div class="w-full p-4 pb-6 bg-gray-600">
    <form
      class="text-sm flex flex-col gap-2 w-min text-white"
      @submit.prevent="setNewGrid"
    >
      <div class="mb-4 space-y-3">
        <h3 class="font-semibold">Difficulty</h3>
        <div class="mb-2 flex gap-2">
          <UIRadioButton
            v-for="(value, key) in difficultySettings"
            :key="key"
            :value="key"
            v-model="selectedDifficulty"
          >
            {{ toCapitalize(key) }}
          </UIRadioButton>
        </div>
        <div class="flex items-center w-min gap-1">
          <input
            type="number"
            v-model="inputs.mines"
            class="text-gray-800 p-1 rounded-md max-w-12"
          />
          <label>Mines</label>
        </div>
      </div>

      <h3 class="font-semibold">Field Size</h3>
      <div class="mb-2 flex gap-2">
        <UIRadioButton
          v-for="(value, key) in sizeSettings"
          :key="key"
          :value="key"
          v-model="selectedSize"
        >
          {{ toCapitalize(key) }}
        </UIRadioButton>
      </div>
      <div class="flex items-center w-min gap-1">
        <label>W:</label>
        <input
          type="number"
          v-model="inputs.width"
          class="text-gray-800 p-1 mr-2 rounded-md max-w-12"
        />
        <label>H:</label>
        <input
          type="number"
          v-model="inputs.height"
          class="text-gray-800 p-1 rounded-md max-w-12"
        />
      </div>

      <button type="submit" class="w-min p-2 bg-gray-500 rounded-md mt-1">
        Apply
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { createGlobalState, useStorage } from "@vueuse/core";
import { resetGame } from "@/utils/useGameplay";
import { bombCount, gridWidth, gridHeight } from "@/utils/useCreateGrid";

import UIRadioButton from "@/components/UIRadioButton.vue";

const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Storage for grid settings
const cachedGrid = useStorage("grid-settings", {
  size: "small",
  difficulty: "easy",
  width: 12,
  height: 20,
  mines: 20,
});

const inputs = ref({ ...cachedGrid.value });

const difficultySettings = ref({
  easy: 0.1,
  medium: 0.18,
  hard: 0.24,
  custom: 0.2,
});

const selectedDifficulty = ref(cachedGrid.value.difficulty);

const sizeSettings = ref({
  small: { w: 10, h: 12 },
  medium: { w: 14, h: 16 },
  large: { w: 20, h: 24 },
  custom: { w: 10, h: 12 },
});

const selectedSize = ref(cachedGrid.value.size);

// Computed values
const gridSize = computed(() => inputs.value.width * inputs.value.height);

// Watch for bomb count changes -> set difficulty preset if it matches
watch(
  () => inputs.value.mines,
  () => {
    const difficultyPercent = (inputs.value.mines / gridSize.value).toFixed(2);
    const match = Object.entries(difficultySettings.value).find(
      ([, percent]) => Math.abs(difficultyPercent - percent) < 0.01
    );
    console.log(difficultyPercent);
    selectedDifficulty.value = match?.[0] || "custom";
    if (selectedDifficulty.value === "custom") {
      difficultySettings.value.custom = difficultyPercent;
    }
  }
);

// Watch for difficulty changes -> update bomb count accordingly
watch(selectedDifficulty, (key) => {
  if (key === "custom") return;
  const percent = difficultySettings.value[key];
  inputs.value.mines = Math.floor(gridSize.value * percent);
});

// Watch for size preset change -> update width/height
watch(selectedSize, (key) => {
  if (key === "custom") return;
  const preset = sizeSettings.value[key];
  inputs.value.width = preset.w;
  inputs.value.height = preset.h;
});

// Watch width/height change -> update size preset + recalculate mines
watch(
  () => [inputs.value.width, inputs.value.height],
  ([w, h]) => {
    const matched = Object.entries(sizeSettings.value).find(
      ([, val]) => val.w === w && val.h === h
    );
    selectedSize.value = matched?.[0] || "custom";
    const newSize = w * h;
    inputs.value.mines = Math.floor(
      newSize * difficultySettings.value[selectedDifficulty.value]
    );
  }
);

const maxMines = computed(() => Math.floor(gridSize.value * 0.5));
const minMines = computed(() => Math.floor(gridSize.value * 0.05));
// Apply grid with clamped values
const setNewGrid = () => {
  const width = Math.max(10, Math.min(inputs.value.width, 44));
  const height = Math.max(12, Math.min(inputs.value.height, 48));
  const mines = Math.max(
    minMines.value,
    Math.min(inputs.value.mines, maxMines.value)
  );

  const newGrid = { width, height, mines };
  inputs.value = newGrid;

  cachedGrid.value = {
    size: selectedSize.value,
    difficulty: selectedDifficulty.value,
    ...newGrid,
  };

  gridWidth.value = width;
  gridHeight.value = height;
  bombCount.value = mines;
  resetGame();
};
</script>
