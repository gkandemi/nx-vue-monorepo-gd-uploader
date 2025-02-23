/**
 * A mapping of file extensions to corresponding emoji icons.
 * Used for displaying file types visually in the UI.
 *
 * @constant {Record<string, string>}
 */
export const FILE_ICONS: Record<string, string> = {
  pdf: "📕", // PDF document
  doc: "📄", // Word document (old format)
  docx: "📄", // Word document (new format)
  xls: "📊", // Excel spreadsheet (old format)
  xlsx: "📊", // Excel spreadsheet (new format)
  ppt: "📽️", // PowerPoint presentation (old format)
  pptx: "📽️", // PowerPoint presentation (new format)
  zip: "📦", // Compressed archive (ZIP)
  rar: "📦", // Compressed archive (RAR)
  txt: "📜", // Plain text file
  mp4: "🎬", // Video file (MP4)
  avi: "🎥", // Video file (AVI)
  default: "📂", // Default folder/file icon for unknown types
};
