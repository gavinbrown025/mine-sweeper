import { ref, computed, watchEffect } from "vue";
import {
  gridSet,
  setBombLocations,
  bombLocations,
  initializeGrid,
  bombCount,
  gridSize,
} from "@/utils/useCreateGrid";

import { flagMode } from "@/utils/useFlags";

export const gameStatus = ref("initialized");

const showAllCells = () => {
  gridSet.value = gridSet.value.map((cell) => ({ ...cell, show: true }));
};

const gameLost = () => {
  gameStatus.value = "loss";
  showAllCells();
};
export const resetGame = () => {
  flagMode.value = false;
  gameStatus.value = "initialized";
  initializeGrid();
};

const clearedCells = computed(
  () => gridSet.value.filter((cell) => cell.show).length
);

watchEffect(() => {
  const total = gridSize.value - bombCount.value;
  if (clearedCells.value == total) {
    gameStatus.value = "win";
    bombLocations.value.forEach((i) => (gridSet.value[i].flagged = true));
  }
});

const showSurrounding = (startIndex, setToReveal) => {
  if (!gridSet.value[startIndex]) return;
  gridSet.value[startIndex].surroundings
    .filter((s) => !setToReveal.has(s.index))
    .forEach((s) => {
      if (gridSet.value[s.index].flagged) return;
      setToReveal.add(s.index);
      if (s.count === 0) showSurrounding(s.index, setToReveal);
    });
};

const floodFill = (i) => {
  const setToReveal = new Set();
  showSurrounding(i, setToReveal);
  setToReveal.forEach((idx) => (gridSet.value[idx].show = true));
};

export const checkCell = (i) => {
  if (gameStatus.value == "initialized") setBombLocations(i);
  if (gameStatus.value != "active") return;

  const { show, count, flagged } = gridSet.value[i];
  if (flagged || show) return;
  if (count == 9) return gameLost();

  gridSet.value[i].show = true;
  if (count === 0) floodFill(i);
};