<script setup>
import { ref, computed, watch } from "vue";

import { gameStatus } from "@/utils/useGameplay";

import { useIntervalFn } from "@vueuse/core";

// Time counter (in seconds)
const elapsedTime = ref(0);

watch(gameStatus, (status) => {
  if (status === "active") {
    startTimer();
  } else if (status === "loss" || status === "win") {
    stopTimer();
  } else if (status === "initialized") {
    resetTimer();
  }
});

// Start/stop logic
const {
  pause: stopTimer,
  resume: startTimer,
  isActive,
} = useIntervalFn(() => elapsedTime.value++, 1000, { immediate: false });

// Optional: reset if you want to restart the game
const resetTimer = () => {
  elapsedTime.value = 0;
  stopTimer();
};

// Format MM:SS
const formattedTime = computed(() => {
  const mins = String(Math.floor(elapsedTime.value / 60)).padStart(2, "0");
  const secs = String(elapsedTime.value % 60).padStart(2, "0");
  return `${mins}:${secs}`;
});

// Expose functions so you can call `startTimer()` when the game starts
// and `stopTimer()` when it ends
</script>

<template>
  <div class="px-2 py-1 border-white border-2 rounded-md   text-lg font-mono text-white">{{ formattedTime }}</div>
</template>
