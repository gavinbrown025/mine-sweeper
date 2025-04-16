<script setup>
import { formattedTime } from '@/utils/useTimer';
</script>

<template>
  <div
    class="px-2 py-1 border-white border-2 rounded-md text-base font-semibold text-white flex justify-center items-center"
  >
    {{ formattedTime }}
  </div>
</template>
