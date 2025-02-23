import { ref } from 'vue';
import { DriveFolder } from '@google-drive-monorepo/types';

/**
 * Composable function for handling Google Drive API interactions.
 * Manages authentication, folder retrieval, and token management.
 *
 * @returns {{
 *   accessToken: Ref<string | null>,
 *   folders: Ref<DriveFolder[]>,
 *   setAccessToken: (token: string) => void,
 *   fetchFolders: () => Promise<void>
 * }}
 */
export function useGoogleDrive() {
  /**
   * Stores the Google Drive API access token.
   * @type {Ref<string | null>}
   */
  const accessToken = ref<string | null>(null);

  /**
   * Holds the list of Google Drive folders retrieved from the API.
   * @type {Ref<DriveFolder[]>}
   */
  const folders = ref<DriveFolder[]>([]);

  /**
   * Sets the access token to be used for API requests.
   *
   * @param {string} token - The Google Drive API access token.
   */
  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  /**
   * Fetches the list of Google Drive folders.
   *
   * @async
   * @function fetchFolders
   * @returns {Promise<void>}
   */
  const fetchFolders = async () => {
    if (!accessToken.value) {
      console.error('No access token available');
      return;
    }

    try {
      const response = await fetch(
        'https://www.googleapis.com/drive/v3/files?q=mimeType="application/vnd.google-apps.folder"&fields=files(id,name)',
        {
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        }
      );

      const data = await response.json();
      folders.value = data.files || [];
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  return {
    accessToken,
    folders,
    setAccessToken,
    fetchFolders
  };
}
