import { ref, computed } from 'vue'

import { gameStatus } from './useGameplay'

export const gridWidth = ref()
export const gridHeight = ref()
export const gridSize = computed(() => gridWidth.value * gridHeight.value)

export const bombCount = ref()
export const bombLocations = ref()
export const gridSet = ref([])

export const initializeGrid = () => {
  gridSet.value = new Array(gridSize.value).fill({})
}

function uniqueRandomNumbers(maxNumber, count, excluded) {
  const numbers = new Set()
  while (numbers.size < count) {
    const randomNumber = Math.floor(Math.random() * maxNumber)
    if (!excluded.includes(randomNumber)) numbers.add(randomNumber)
  }
  return Array.from(numbers)
}

export const getSurroundings = (i) => {
  const w = gridWidth.value
  const h = gridHeight.value

  const col = i % w
  const row = Math.floor(i / w)

  const top = row == 0
  const right = col == w - 1
  const bottom = row == h - 1
  const left = col == 0

  return [
    !top && i - w,
    !right && i + 1,
    !bottom && i + w,
    !left && i - 1,
    !(top || right) && i + 1 - w,
    !(bottom || right) && i + 1 + w,
    !(top || left) && i - w - 1,
    !(bottom || left) && i - 1 + w,
  ].filter((si) => si || si === 0)
}

export const getCount = (surroundings) =>
  surroundings.reduce((total, i) => {
    if (bombLocations.value.includes(i)) return total + 1
    return total
  }, 0)

export const setBombLocations = (startPoint) => {
  const set = uniqueRandomNumbers(gridSize.value - 1, bombCount.value, [
    startPoint,
    ...getSurroundings(startPoint),
  ])
  bombLocations.value = set

  gridSet.value = gridSet.value.map((_, i) => {
    const count = set.includes(i) ? 9 : getCount(getSurroundings(i))
    return { show: false, count, surroundings: {} }
  })
  gridSet.value.forEach((_, i, arr) => {
    arr[i].surroundings = getSurroundings(i).map((n) => ({
      index: n,
      count: arr[n]?.count,
    }))
  })
  gameStatus.value = 'active'
}
