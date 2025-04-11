import { ref, computed } from "vue";
import { gridSet, bombCount } from "@/utils/useCreateGrid";
import { gameStatus } from "@/utils/useGameplay";

export const flagMode = ref(false);
export const availableFlagCount = computed(() => {
  const flagged = gridSet.value.filter((cell) => cell.flagged).length;
  return bombCount.value - flagged;
});

export const toggleFlagMode = () => {
  if (gameStatus.value != "active") return;
  flagMode.value = !flagMode.value;
};

export const flagCell = (i) => {
  if (gameStatus.value != "active") return;
  if (gridSet.value[i].show) return;
  if (availableFlagCount.value <= 0) return;
  gridSet.value[i].flagged = !gridSet.value[i].flagged;
};
