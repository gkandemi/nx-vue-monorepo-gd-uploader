/**
 * Represents a file in the Dropzone, including the file object and its preview URL.
 */
export interface DropzoneFile {
  /**
   * The actual file object.
   */
  file: File;

  /**
   * The preview URL for the file (if applicable).
   * Null if no preview is available.
   */
  preview: string | null;
}

/**
 * Defines the configurable properties for the Dropzone component.
 */
export interface DropzoneProps {
  /**
   * Specifies the accepted file types as a comma-separated string.
   * Example: `"image/png, image/jpeg"`.
   * If not provided, all file types are accepted.
   * @default undefined
   */
  accept?: string;

  /**
   * Determines whether multiple files can be selected at once.
   * If `true`, users can upload multiple files; otherwise, only a single file is allowed.
   * @default false
   */
  multiple?: boolean;
}
