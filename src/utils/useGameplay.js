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
      setToReveal.add(s.index);
      if (s.count === 0) showSurrounding(s.index, setToReveal);
    });
};

// const floodFill2 = (startIndex) => {
//   if (!gridSet.value[startIndex]) return;
//   gridSet.value[startIndex].surroundings
//     .filter((s) => !gridSet.value[s.index].show)
//     .forEach((s) => {
//       gridSet.value[s.index].show = true;
//       if (s.count === 0) {
//         return floodFill(s.index);
//       }
//     });
// };

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

watchEffect(() => {
  console.log(gameStatus.value)
})
