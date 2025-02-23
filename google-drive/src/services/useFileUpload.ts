import { ref, watch } from 'vue';
import { uploadFileToDrive } from './googleDrive.service';
import { StatusType } from '@google-drive-monorepo/types';

/**
 * Composable function for handling file uploads to Google Drive.
 * Provides state management for selected files, folder selection, upload progress, and status.
 *
 * @returns {{
 *   selectedFiles: Ref<{ file: File, preview: string }[]>,
 *   selectedFolder: Ref<{ id: string, name: string } | null>,
 *   uploadProgress: Ref<number>,
 *   uploadStatus: Ref<{ status: StatusType, message: string } | null>,
 *   uploadFiles: (accessToken: string) => Promise<void>
 * }}
 */
export function useFileUpload() {
  /**
   * List of selected files with their preview images.
   * @type {Ref<{ file: File, preview: string }[]>}
   */
  const selectedFiles = ref<{ file: File, preview: string }[]>([]);

  /**
   * The selected folder where files will be uploaded.
   * @type {Ref<{ id: string, name: string } | null>}
   */
  const selectedFolder = ref<{ id: string; name: string } | null>(null);

  /**
   * Tracks the upload progress percentage.
   * @type {Ref<number>}
   */
  const uploadProgress = ref<number>(0);

  /**
   * Stores the upload status message and type.
   * @type {Ref<{ status: StatusType, message: string } | null>}
   */
  const uploadStatus = ref<{ status: StatusType; message: string } | null>(null);

  /**
   * Watches the selected files and updates the upload status when files are added.
   */
  watch(selectedFiles, (files) => {
    if (files.length) {
      uploadStatus.value = {
        status: StatusType.INFO,
        message: `${files.length} files selected for upload.`
      };
    }
  });

  /**
   * Uploads selected files to Google Drive.
   *
   * @async
   * @function uploadFiles
   * @param {string} accessToken - The authentication token required for uploading.
   * @returns {Promise<void>}
   */
  const uploadFiles = async (accessToken: string) => {
    if (!accessToken) {
      uploadStatus.value = {
        status: StatusType.ERROR,
        message: '❌ Authentication token is missing.'
      };
      return;
    }

    if (!selectedFolder.value) {
      uploadStatus.value = {
        status: StatusType.ERROR,
        message: '❌ Please select a folder to upload files to.'
      };
      return;
    }

    if (!selectedFiles.value.length) {
      uploadStatus.value = {
        status: StatusType.ERROR,
        message: '⚠️ Please select files to upload.'
      };
      return;
    }

    uploadStatus.value = {
      status: StatusType.INFO,
      message: '📂 Uploading files to Google Drive...'
    };
    uploadProgress.value = 0;

    try {
      for (const file of selectedFiles.value) {
        await uploadFileToDrive(
          accessToken,
          selectedFolder.value.id,
          file?.file,
          (progress) => {
            uploadProgress.value = progress;
          }
        );
      }

      uploadStatus.value = {
        status: StatusType.SUCCESS,
        message: '✅ Files uploaded successfully.'
      };

      // Clear selected files after successful upload
      selectedFiles.value = [];

      // Reset status message after 2 seconds
      setTimeout(() => (uploadStatus.value = null), 2000);

    } catch (error) {
      console.error('File Upload Error: ', error);
      uploadStatus.value = {
        status: StatusType.ERROR,
        message: '❌ File upload failed. Please try again.'
      };
    }
  };

  return {
    selectedFiles,
    selectedFolder,
    uploadProgress,
    uploadStatus,
    uploadFiles
  };
}
