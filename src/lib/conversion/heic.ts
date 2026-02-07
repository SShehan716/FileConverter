import type { ConversionResult } from './types';
import type { TargetFormat } from '../constants';
import { EXT_FOR_TARGET, TARGETS_SUPPORTED_IN_BROWSER } from '../constants';
import { imageDataToBlob } from './canvasEncode';
import { imageDataToGifBlob } from './gifEncode';
import { imageDataToBmpBlob } from './bmpEncode';

async function getHeicConvert() {
  return import('heic-convert/browser');
}

async function decodeHeicToImageData(file: File): Promise<ImageData> {
  const heicDecode = await import('heic-decode');
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const decoded = await heicDecode.default({ buffer });
  return new ImageData(
    new Uint8ClampedArray(decoded.data),
    decoded.width,
    decoded.height
  );
}

export async function convertHeic(
  file: File,
  targetFormat: TargetFormat,
  quality: number
): Promise<ConversionResult> {
  if (!TARGETS_SUPPORTED_IN_BROWSER.includes(targetFormat)) {
    throw new Error('Encoding to HEIC/HEIF is not supported in the browser.');
  }

  const baseName = file.name.replace(/\.[^.]+$/i, '');
  const ext = EXT_FOR_TARGET[targetFormat];

  if (targetFormat === 'PNG' || targetFormat === 'JPEG') {
    const convert = await getHeicConvert();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const opts: { buffer: Uint8Array; format: 'PNG' | 'JPEG'; quality?: number } = {
      buffer,
      format: targetFormat as 'PNG' | 'JPEG',
    };
    if (targetFormat === 'JPEG') opts.quality = quality;
    const outputBuffer = await convert.default(opts);
    const blob = new Blob([outputBuffer as BlobPart], {
      type: targetFormat === 'PNG' ? 'image/png' : 'image/jpeg',
    });
    return { blob, name: `${baseName}.${ext}` };
  }

  const imageData = await decodeHeicToImageData(file);

  if (targetFormat === 'WebP') {
    const blob = await imageDataToBlob(imageData, 'image/webp', quality);
    return { blob, name: `${baseName}.${ext}` };
  }
  if (targetFormat === 'GIF') {
    const blob = await imageDataToGifBlob(imageData);
    return { blob, name: `${baseName}.${ext}` };
  }
  if (targetFormat === 'BMP') {
    const blob = await imageDataToBmpBlob(imageData);
    return { blob, name: `${baseName}.${ext}` };
  }

  throw new Error(`Unsupported target: ${targetFormat}`);
}
