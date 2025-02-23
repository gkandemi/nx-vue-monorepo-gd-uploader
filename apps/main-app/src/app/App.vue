<script setup lang="ts">
import { onMounted } from 'vue';
import { Alert, Button, Dropdown, Dropzone } from '@google-drive-monorepo/ui';
import { useGoogleDrive } from '@google-drive-monorepo/google-drive';
import { useFileUpload } from '@google-drive-monorepo/google-drive';

const { accessToken, folders, setAccessToken, fetchFolders } = useGoogleDrive();
const { selectedFiles, selectedFolder, uploadProgress, uploadStatus, uploadFiles } = useFileUpload();

/**
 * Logs in the user by fetching the Google Drive access token from environment variables.
 * If the token is found, it sets the access token and fetches available folders.
 *
 * @async
 * @function loginWithGoogle
 * @returns {Promise<void>}
 */
const loginWithGoogle = async (): Promise<void> => {
  const token = import.meta.env?.VITE_GOOGLE_DRIVE_ACCESS_TOKEN as string;
  if (!token) {
    console.error("Google Drive Access Token not found. Please add it to your .env file.");
    return;
  }
  setAccessToken(token);
  await fetchFolders();
};

/**
 * Handles the file upload process.
 * Ensures that the selected files are uploaded to the selected folder in Google Drive.
 *
 * @function handleUpload
 * @returns {void}
 */
const handleUpload = (): void => {
  uploadFiles(accessToken.value);
};

// Lifecycle hook: When the component is mounted, attempt to log in and fetch folders.
onMounted(async () => {
  await loginWithGoogle();
});
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
    <h1 class="text-lg font-bold mb-4">Upload Files to Google Drive</h1>

    <!-- Folder Selection -->
    <Dropdown :options="folders" v-model="selectedFolder" class="mb-4" />

    <template v-if="selectedFolder">
      <Dropzone v-model="selectedFiles" />

      <Button type="button" @click="handleUpload" class="mt-4" :disabled="!selectedFiles.length || !selectedFolder">
        Upload Files
      </Button>

      <!-- Alert Component for Upload Status -->
      <Alert class="mt-4" v-if="uploadStatus" :message="uploadStatus.message" :type="uploadStatus.status" />

      <!-- Upload Progress Bar -->
      <div v-if="uploadProgress > 0 && uploadProgress < 100" class="w-64 bg-gray-300 rounded-full h-3 mt-2">
        <div class="bg-blue-600 h-3 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
      </div>
    </template>
  </div>
</template>
