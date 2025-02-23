<script setup lang="ts">
import { computed, h, useSlots } from 'vue';
import { ButtonType, ButtonVariant, ButtonSize, ButtonProps } from '../types/buttonTypes';

/**
 * Button component props
 * @typedef {Object} ButtonProps
 * @property {ButtonType} type - The button type (button, submit, reset).
 * @property {boolean} disabled - Whether the button is disabled.
 * @property {ButtonVariant} variant - The style variant of the button.
 * @property {ButtonSize} size - The size of the button.
 */

const props = withDefaults(defineProps<ButtonProps>(), {
  /** Default button type is 'button' */
  type: ButtonType.BUTTON,

  /** Button is enabled by default */
  disabled: false,

  /** Default variant is PRIMARY */
  variant: ButtonVariant.PRIMARY,

  /** Default size is MEDIUM */
  size: ButtonSize.MD,
});

const slots = useSlots();

/**
 * Computes the CSS classes for the button based on variant and size.
 * @returns {string} - The computed CSS class string.
 */
const buttonClass = computed(() => {
  const base = 'px-6 py-2 rounded disabled:opacity-50 transition-all duration-200';

  const variants = {
    [ButtonVariant.PRIMARY]: 'bg-blue-500 text-white hover:bg-blue-600',
    [ButtonVariant.SECONDARY]: 'bg-gray-500 text-white hover:bg-gray-600',
    [ButtonVariant.DANGER]: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes = {
    [ButtonSize.SM]: 'text-sm px-4 py-1',
    [ButtonSize.MD]: 'text-base px-6 py-2',
    [ButtonSize.LG]: 'text-lg px-8 py-3',
  };

  return `${base} ${variants[props.variant]} ${sizes[props.size]}`;
});

/**
 * Renders the button element dynamically.
 * @returns {VNode} - The rendered button node.
 */
const renderButton = () => {
  return h(
    'button',
    {
      class: buttonClass.value,
      type: props.type,
      disabled: props.disabled,
    },
    slots.default ? slots.default() : ''
  );
};
</script>

<template>
  <!-- Render the button component dynamically -->
  <component :is="renderButton" />
</template>
