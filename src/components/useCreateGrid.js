import { ref, computed } from 'vue'

export const gridWidth = ref()
export const gridHeight = ref()
export const gridSize = computed(() => gridWidth.value * gridHeight.value)

export const bombCount = ref(16)
export const bombLocations = ref()
export const gridSet = ref([])

function uniqueRandomNumbers(maxNumber, count) {
	const numbers = new Set()
	while (numbers.size < count) {
		const randomNumber = Math.floor(Math.random() * maxNumber)
		numbers.add(randomNumber)
	}
	return Array.from(numbers)
}

export const dangerCount = (i) => {
	const w = gridWidth.value
	const h = gridHeight.value

	const col = i % w
	const row = Math.floor(i / w)

	const top = row == 0
	const right = col == w - 1
	const bottom = row == h - 1
	const left = col == 0

	const surroundingIndexes = {
		...{ T: !top && i - w },
		...{ R: !right && i + 1 },
		...{ B: !bottom && i + w },
		...{ L: !left && i - 1 },
		...{ TR: !(top || right) && i + 1 - w },
		...{ BR: !(bottom || right) && i + 1 + w },
		...{ TL: !(top || left) && i - w - 1 },
		...{ BL: !(bottom || left) && i - 1 + w },
	}

	return Object.values(surroundingIndexes).reduce((total, i) => {
		if (bombLocations.value.includes(i)) return total + 1
		return total
	}, 0)
}

export const setBombLocations = () => {
	const set = uniqueRandomNumbers(gridSize.value - 1, bombCount.value)
	bombLocations.value = set
	gridSet.value = new Array(gridSize.value)
		.fill(false)
		.map((_, i) => set.includes(i))
}
