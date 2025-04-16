import { ref, computed, watch } from "vue";
import { useIntervalFn } from "@vueuse/core";

import { gameStatus } from "@/utils/useGameplay";

// Time counter (in seconds)
export const elapsedTime = ref(0);

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

watch(gameStatus, (status) => {
  if (status === "active") startTimer();
  if (status === "loss" || status === "win") stopTimer();
  if (status === "initialized") resetTimer();
});

// Format MM:SS
export const formattedTime = computed(() => {
  const mins = String(Math.floor(elapsedTime.value / 60)).padStart(2, "0");
  const secs = String(elapsedTime.value % 60).padStart(2, "0");
  return `${mins}:${secs}`;
});
