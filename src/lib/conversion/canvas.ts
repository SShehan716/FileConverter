import type { ConversionResult } from './types';
import type { TargetFormat } from '../constants';
import { MIME_FOR_TARGET, EXT_FOR_TARGET, TARGETS_SUPPORTED_IN_BROWSER } from '../constants';
import { imageDataToGifBlob } from './gifEncode';
import { imageDataToBmpBlob } from './bmpEncode';

export async function convertWithCanvas(
  file: File,
  targetFormat: TargetFormat,
  quality: number
): Promise<ConversionResult> {
  if (!TARGETS_SUPPORTED_IN_BROWSER.includes(targetFormat)) {
    throw new Error('Unsupported target format');
  }

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2d not available');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const baseName = file.name.replace(/\.[^.]+$/i, '');
  const ext = EXT_FOR_TARGET[targetFormat];

  if (targetFormat === 'GIF') {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const blob = await imageDataToGifBlob(imageData);
    return { blob, name: `${baseName}.${ext}` };
  }
  if (targetFormat === 'BMP') {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const blob = await imageDataToBmpBlob(imageData);
    return { blob, name: `${baseName}.${ext}` };
  }

  const mime = MIME_FOR_TARGET[targetFormat];
  const blob = await new Promise<Blob | null>((resolve) => {
    if (targetFormat === 'PNG') {
      canvas.toBlob(resolve, mime);
    } else {
      canvas.toBlob(resolve, mime, quality);
    }
  });

  if (!blob) throw new Error('Canvas conversion failed');
  return { blob, name: `${baseName}.${ext}` };
}
