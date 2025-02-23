import { FILE_ICONS } from "../constants/fileTypes";
import type { DropzoneFile } from "../types/dropzone.ts";

/**
 * Checks if a given file is an image based on its MIME type.
 *
 * @param {File} file - The file to check.
 * @returns {boolean} - Returns `true` if the file is an image, otherwise `false`.
 */
export const isImage = (file: File): boolean => {
  return file.type.startsWith("image/");
};

/**
 * Retrieves the corresponding icon for a given file based on its extension.
 *
 * @param {File} file - The file whose icon needs to be determined.
 * @returns {string} - The file icon URL or a default icon if no match is found.
 */
export const getFileIcon = (file: File): string => {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  return FILE_ICONS[extension] || FILE_ICONS.default;
};

/**
 * Converts a `FileList` into an array of `DropzoneFile` objects.
 *
 * @param {FileList} fileList - The list of files selected by the user.
 * @returns {DropzoneFile[]} - An array of `DropzoneFile` objects with file data and optional preview URLs.
 */
export const handleFiles = (fileList: FileList): DropzoneFile[] => {
  return Array.from(fileList).map((file) => ({
    file,
    preview: isImage(file) ? URL.createObjectURL(file) : null,
  }));
};
