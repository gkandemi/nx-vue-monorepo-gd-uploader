<script setup lang="ts">
import { computed } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import type { DropdownProps, DropdownOption } from '../types/dropdown';

/**
 * Dropdown component props
 * @typedef {Object} DropdownProps
 * @property {string} keyExpression - The key used for identifying options (default: 'id').
 * @property {string} textExpression - The property name to display in the dropdown (default: 'name').
 * @property {DropdownOption[]} options - The list of selectable options.
 */

const props = withDefaults(
  defineProps<DropdownProps>(),
  {
    /** Default key for identifying options */
    keyExpression: 'id',

    /** Default text field to display */
    textExpression: 'name',
  }
);

/**
 * v-model for dropdown selection
 * @type {import('vue').Ref<DropdownOption | null>}
 */
const modelValue = defineModel<DropdownOption | null>();

/**
 * Computes the selected item, defaulting to "Select a folder" if none is selected.
 * @returns {DropdownOption} - The currently selected option.
 */
const selected = computed(() => {
  return modelValue.value ?? { id: null, name: "Select a folder" };
});
</script>

<template>
  <div class="relative w-64">
    <Listbox v-model="modelValue" v-slot="{ open }">
      <div class="relative">
        <ListboxButton class="relative w-full pl-4 pr-7 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left">
          {{ selected?.[props.textExpression] }}

          <!-- Dropdown icon (open/close states) Normally these will be come from AppIcon component-->
          <svg v-if="!open" class="absolute right-2 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
          </svg>
          <svg v-else class="absolute right-2 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
          </svg>

        </ListboxButton>

        <!-- Dropdown options -->
        <ListboxOptions class="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ListboxOption
            v-for="option in props.options"
            :key="option[props.keyExpression]"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-blue-500 text-white' : 'text-gray-900',
                'cursor-pointer select-none relative py-2 px-4'
              ]"
            >
              <span :class="{ 'font-semibold': selected }">{{ option?.[props.textExpression] }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
