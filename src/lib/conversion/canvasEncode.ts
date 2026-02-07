/**
 * Encode ImageData to a Blob using canvas toBlob (PNG, JPEG, WebP).
 */
export function imageDataToBlob(
  data: ImageData,
  mime: string,
  quality?: number
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = data.width;
  canvas.height = data.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2d not available');
  ctx.putImageData(data, 0, 0);
  return new Promise((resolve, reject) => {
    if (mime === 'image/png') {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), mime);
    } else {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))),
        mime,
        quality
      );
    }
  });
}
