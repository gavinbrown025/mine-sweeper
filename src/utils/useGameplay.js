import { ref, watch, computed, watchEffect } from "vue";
import {
  gridSet,
  setBombLocations,
  initializeGrid,
  bombCount,
  gridSize,
} from "@/utils/useCreateGrid";

export const gameStatus = ref("initialized");

const showAllCells = () => {
  gridSet.value = gridSet.value.map((cell) => ({ ...cell, show: true }));
};

const gameLost = () => {
  gameStatus.value = "loss";
  showAllCells();
};
export const resetGame = () => {
  gameStatus.value = "initialized";
  initializeGrid();
};

const cleared = computed(
  () => gridSet.value.filter((cell) => cell.show).length
);

watchEffect(() => {
  const total = gridSize.value - bombCount.value;
  if (cleared.value == total) gameStatus.value = "win";
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
  const { show, count, flagged } = gridSet.value[i];
  if (flagged || show) return;
  if (count == 9) return gameLost();

  gridSet.value[i].show = true;
  if (count === 0) floodFill(i);
};

export const flagCell = (i) => {
  if (gameStatus.value != "active") return;
  if (gridSet.value[i].show) return;
  gridSet.value[i].flagged = !gridSet.value[i].flagged;
};
