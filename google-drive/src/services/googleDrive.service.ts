/**
 * Uploads a file to Google Drive.
 *
 * @async
 * @function uploadFileToDrive
 * @param {string} accessToken - The Google Drive API access token.
 * @param {string} folderId - The ID of the Google Drive folder where the file should be uploaded.
 * @param {File} file - The file to be uploaded.
 * @param {Function} [onProgress] - Optional callback function to track upload progress (percentage).
 * @returns {Promise<object>} - Resolves with the uploaded file's metadata from Google Drive API.
 * @throws {Error} Throws an error if the upload fails.
 */
export async function uploadFileToDrive(
  accessToken: string,
  folderId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<object> {
  const metadata = {
    name: file.name,
    parents: [folderId],
  };

  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append('file', file);

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', true);
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    };

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Google Drive API Error Code: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('File upload failed'));
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
