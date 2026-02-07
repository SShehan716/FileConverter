import type { ConversionResult } from './types';
import type { TargetFormat } from '../constants';
import { MIME_FOR_TARGET, EXT_FOR_TARGET } from '../constants';

export async function convertWithCanvas(
  file: File,
  targetFormat: TargetFormat,
  quality: number
): Promise<ConversionResult> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2d not available');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const mime = MIME_FOR_TARGET[targetFormat];
  const blob = await new Promise<Blob | null>((resolve) => {
    if (targetFormat === 'PNG') {
      canvas.toBlob(resolve, mime);
    } else {
      canvas.toBlob(resolve, mime, quality);
    }
  });

  if (!blob) throw new Error('Canvas conversion failed');
  const baseName = file.name.replace(/\.[^.]+$/i, '');
  const ext = EXT_FOR_TARGET[targetFormat];
  return { blob, name: `${baseName}.${ext}` };
}
