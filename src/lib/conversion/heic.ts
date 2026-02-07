import type { ConversionResult } from './types';
import type { TargetFormat } from '../constants';
import { EXT_FOR_TARGET } from '../constants';

// Dynamic import so we only load browser build in browser
async function getHeicConvert() {
  return import('heic-convert/browser');
}

export async function convertHeic(
  file: File,
  targetFormat: TargetFormat,
  quality: number
): Promise<ConversionResult> {
  if (targetFormat !== 'PNG' && targetFormat !== 'JPEG') {
    throw new Error('HEIC can only be converted to PNG or JPEG');
  }
  const convert = await getHeicConvert();
  const arrayBuffer = await file.arrayBuffer();
  // heic-decode uses spread on buffer.slice(); ArrayBuffer is not iterable, Uint8Array is
  const buffer = new Uint8Array(arrayBuffer);
  const opts: { buffer: Uint8Array; format: 'PNG' | 'JPEG'; quality?: number } = {
    buffer,
    format: targetFormat as 'PNG' | 'JPEG',
  };
  if (targetFormat === 'JPEG') {
    opts.quality = quality;
  }
  const outputBuffer = await convert.default(opts);
  const blob = new Blob([outputBuffer as BlobPart], {
    type: targetFormat === 'PNG' ? 'image/png' : 'image/jpeg',
  });
  const baseName = file.name.replace(/\.[^.]+$/i, '');
  const ext = EXT_FOR_TARGET[targetFormat];
  return { blob, name: `${baseName}.${ext}` };
}
