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
}

const cleared = computed(
  () => gridSet.value.filter((cell) => cell.show).length
);

watchEffect(() => {
  const total = gridSize.value - bombCount.value;
  if (cleared.value == total) gameStatus.value = "win";
});

export const callCount = ref(0);

const showSurrounding = (startIndex, setToReveal) => {
  if (!gridSet.value[startIndex]) return;
  setToReveal.add(startIndex);

  gridSet.value[startIndex].surroundings.forEach((surrounding) => {
    callCount.value++;
    if (setToReveal.has(surrounding.index)) return;
    if (surrounding.count === 0) {
      return showSurrounding(surrounding.index, setToReveal);
    }
    setToReveal.add(surrounding.index);
  });
};

const floodFill = (i) => {
  const setToReveal = new Set();
  showSurrounding(i, setToReveal);
  setToReveal.forEach((idx) => (gridSet.value[idx].show = true));
};

export const checkCell = (i) => {
  if (gameStatus.value == "initialized") setBombLocations(i);
  const item = gridSet.value[i];
  if (item.count == 9) return gameLost();

  gridSet.value[i].show = true;
  if (item.count === 0) floodFill(i);
};

export const resetGame = () => {
  gameStatus.value = "initialized";
  initializeGrid();
};
