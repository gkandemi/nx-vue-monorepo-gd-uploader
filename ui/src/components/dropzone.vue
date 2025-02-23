<script setup lang="ts">
import { ref } from "vue";
import { handleFiles, getFileIcon } from "../utils/fileHelpers";
import type { DropzoneFile, DropzoneProps } from "../types/dropzone";
import Button from './button.vue';

/**
 * v-model binding for managing selected files
 * @type {import('vue').Ref<DropzoneFile[]>}
 */
const modelValue = defineModel<DropzoneFile[]>();

/**
 * Props for the Dropzone component
 * @typedef {Object} DropzoneProps
 * @property {string} accept - Accepted file types (default: "*").
 * @property {boolean} multiple - Allow multiple file selection (default: true).
 */
const props = withDefaults(
  defineProps<DropzoneProps>(),
  {
    accept: "*",
    multiple: true,
  }
);

/** Track whether a file is being dragged over the dropzone */
const isDragging = ref(false);

/** Reference to the file input element */
const fileInput = ref<HTMLInputElement | null>(null);

/**
 * Handles file drop event
 * @param {DragEvent} event - The drag event containing dropped files
 */
const onDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;
  if (event.dataTransfer?.files) {
    const newFiles = handleFiles(event.dataTransfer.files);
    modelValue.value = props.multiple
      ? [...(modelValue.value || []), ...newFiles]
      : newFiles.slice(0, 1);
  }
};

/**
 * Handles file selection via file input
 * @param {Event} event - The change event from file input
 */
const onFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const newFiles = handleFiles(input.files);
    modelValue.value = props.multiple
      ? [...(modelValue.value || []), ...newFiles]
      : newFiles.slice(0, 1);
  }
};

/** Opens file dialog when the dropzone is clicked */
const openFileDialog = () => {
  fileInput.value?.click();
};

/**
 * Removes a file from the list
 * @param {number} index - Index of the file to be removed
 */
const removeFile = (index: number) => {
  modelValue.value?.splice(index, 1);
};

</script>

<template>
  <div
    class="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center space-y-2 cursor-pointer transition w-full mx-auto"
    :class="{
      'border-blue-500 bg-blue-100': isDragging,
      'hover:border-gray-500': !isDragging,
    }"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @drop="onDrop"
    @click="openFileDialog"
  >
    <p v-if="!modelValue?.length" class="text-gray-500">Drag & Drop or Select Files</p>

    <div v-if="modelValue?.length" class="flex flex-wrap justify-center gap-4 w-full">
      <div
        v-for="(fileObj, idx) in modelValue"
        :key="fileObj.file.name"
        class="group relative p-2 border border-zinc-300 rounded-lg bg-white shadow-md flex flex-col gap-y-2 items-center w-[9.375rem]"
      >
        <img v-if="fileObj.preview" :src="fileObj.preview" class="w-16 h-16 object-cover rounded" />
        <span v-else class="text-3xl">{{ getFileIcon(fileObj.file) }}</span>

        <p class="text-xs mt-1 text-center break-all w-full">{{ fileObj.file.name }}</p>
        <p class="text-xs text-gray-500 mt-auto">{{ (fileObj.file.size / 1024).toFixed(2) }} KB</p>

        <div
          class="rounded-lg text-sm bg-zinc-800/90 flex flex-col p-2 gap-y-2 justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        >
          <p class="text-white text-center">Don't you want to upload this?</p>
          <Button size="sm" variant="danger" @click.stop="removeFile(idx)">Delete</Button>
        </div>
      </div>
    </div>
  </div>

  <input
    type="file"
    :accept="props.accept"
    :multiple="props.multiple"
    hidden
    ref="fileInput"
    @change="onFileSelect"
  />
</template>
