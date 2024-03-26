<script setup>
import { computed, onMounted } from 'vue'
import GridCell from './GridCell.vue'

import {
	gridWidth,
	gridHeight,
	gridSet,
} from '@/utils/useCreateGrid'

const gridStyles = computed(() => {
	return [
		`grid`,
		`grid-cols-${gridWidth.value}`,
		` grid-rows-${gridHeight.value}`,
	]
})


</script>

<template>
	<div :class="gridStyles">
		<div v-for="(item, i) in gridSet" :key="i">
			<GridCell :item="item" :index="i" />
		</div>
	</div>
</template>
