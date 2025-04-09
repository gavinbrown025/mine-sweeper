import { ref, watch, computed, watchEffect } from "vue";
import {
  gridSet,
  setBombLocations,
  bombLocations,
  initializeGrid,
  bombCount,
  gridSize,
} from "@/utils/useCreateGrid";

export const gameStatus = ref("initialized");

const showAllCells = () => {
  gridSet.value = gridSet.value.map((cell) => ({ ...cell, show: true }));
};

watch(
  () => gameStatus.value,
  (nv) => {
    console.log("gameStatus", nv);
    return nv == "loss" && showAllCells();
  }
);

const cleared = computed(
  () => gridSet.value.filter((cell) => cell.show).length
);

watchEffect(() => {
  const total = gridSize.value - bombCount.value;
  if (cleared.value == total) gameStatus.value = "win";
});

export const callCount = ref(0);
export const cancelCount = ref(0);
export const innerForEach = ref(0);

const showSurrounding = (startIndex, adjacentBlanks) => {
  if (!gridSet.value[startIndex]) return cancelCount.value++;

  adjacentBlanks.add(startIndex);

  gridSet.value[startIndex].surroundings.forEach((surrounding) => {
    callCount.value++;
    if (adjacentBlanks.has(surrounding.index)) return;
    if (surrounding.count === 0) {
      return showSurrounding(surrounding.index, adjacentBlanks);
    }
    adjacentBlanks.add(surrounding.index);
  });
};

const expandFromBlank = (i) => {
  const adjacentBlanks = new Set();
  showSurrounding(i, adjacentBlanks);
  adjacentBlanks.forEach((idx) => (gridSet.value[idx].show = true));
};

export const checkCell = (i) => {
  if (gameStatus.value == "initialized") setBombLocations(i);
  const item = gridSet.value[i];
  if (item.count == 9) {
    return (gameStatus.value = "loss");
  }
  gridSet.value[i].show = true;
  if (item.count === 0) expandFromBlank(i);
};

export const resetGame = () => {
  gameStatus.value = "initialized";
  initializeGrid();
};
