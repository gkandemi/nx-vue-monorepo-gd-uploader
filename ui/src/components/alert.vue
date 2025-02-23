<script setup lang="ts">
import { computed } from 'vue';
import { AlertProps } from '../types/alertTypes';
import { StatusType } from '@google-drive-monorepo/types';

/**
 * Props for the Alert component.
 * @typedef {Object} AlertProps
 * @property {StatusType} type - The type of alert (info, error, success).
 * @property {string} message - The message displayed inside the alert.
 */

const props = withDefaults(defineProps<AlertProps>(), {
  /** Default type for the alert is INFO */
  type: StatusType.INFO,
});

/**
 * Computes the CSS class based on the alert type.
 * @returns {string} - The computed class string.
 */
const alertClass = computed(() => {
  const base = 'px-4 py-2 rounded text-sm font-medium';
  const variants = {
    [StatusType.INFO]: 'bg-blue-100 text-blue-700 border border-blue-400',
    [StatusType.ERROR]: 'bg-red-100 text-red-700 border border-red-400',
    [StatusType.SUCCESS]: 'bg-green-100 text-green-700 border border-green-400',
  };
  return `${base} ${variants[props.type]}`;
});
</script>

<template>
  <!-- Displays an alert message with dynamic styling based on type -->
  <div :class="alertClass">
    {{ props.message }}
  </div>
</template>
