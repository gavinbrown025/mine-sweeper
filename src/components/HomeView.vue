<script setup>
import { onMounted } from 'vue'
import { initialGrid, setBombLocations, gridWidth, gridHeight } from '@/utils/useCreateGrid'

import GridContainer from './GridContainer.vue'
onMounted(() => {
	gridWidth.value = 10
	gridHeight.value = 14
  initialGrid()
})

const setstuff = () => {
	gridWidth.value = 12
	gridHeight.value = 18
}
</script>

<template>
	<div class="grid place-items-center">
		<h2 class="text-white p-4 text-xl" @click="setstuff">MineLeSweep</h2>
		<GridContainer />
	</div>
</template>
