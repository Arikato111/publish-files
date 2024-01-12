export function formatSize(bytes: number) {
  let b: string;
  if (bytes >= 1073741824) {
    b = (bytes / 1073741824).toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    b = (bytes / 1048576).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    b = (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes > 1) {
    b = bytes + " bytes";
  } else if (bytes == 1) {
    b = bytes + " byte";
  } else {
    b = "0 bytes";
  }
  return b;
}