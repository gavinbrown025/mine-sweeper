<script setup>
import { dangerCount } from './useCreateGrid'

const props = defineProps({
	item: Boolean,
	index: { type: Number, default: null },
})
</script>

<template>
	<div
		class="size-8 grid place-items-center cursor-pointer"
		:class="
			props.item
				? 'bg-red-400 hover:bg-red-300'
				: 'hover:bg-blue-300 bg-blue-400'
		"
	>
		<span class="leading-none font-bold">{{
			props.item ? '' : dangerCount(props.index) || ''
		}}</span>
	</div>
</template>
