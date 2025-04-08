import { ref, watch } from 'vue'
import {
  gridSet,
  setBombLocations,
  initializeGrid,
} from '@/utils/useCreateGrid'
export const gameStatus = ref('initialized')

const showAllCells = () => {
  gridSet.value = gridSet.value.map((cell) => ({ ...cell, show: true }))
}

watch(
  () => gameStatus.value,
  (nv) => nv == 'loss' && showAllCells()
)

const showSurrounding = (cellIndex, adjacentBlanks) => {
  if (adjacentBlanks.has(cellIndex) || !gridSet.value[cellIndex]) return
  if (cellIndex == 1) console.log('here')
  adjacentBlanks.add(cellIndex)

  gridSet.value[cellIndex].surroundings.forEach((surrounding) => {
    if (surrounding.count == 0) {
      return showSurrounding(surrounding.index, adjacentBlanks)
    }
    adjacentBlanks.add(surrounding.index)
  })
}
export const checkCell = (item, i) => {
  if (i == 1) console.log(item, i)
  if (gameStatus.value == 'initialized') setBombLocations(i)
  if (item.count == 9) {
    return (gameStatus.value = 'loss')
  }
  gridSet.value[i].show = true
  if (!item.count) {
    const adjacentBlanks = new Set()
    showSurrounding(i, adjacentBlanks)
    adjacentBlanks.forEach((idx) => (gridSet.value[idx].show = true))
  }
}
export const resetGame = () => {
  gameStatus.value = 'initialized'
  initializeGrid()
}
