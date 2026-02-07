import type { ConversionResult } from './types';
import type { SourceFormat, TargetFormat } from '../constants';
import {
  TARGETS_SUPPORTED_IN_BROWSER,
  TARGETS_UNSUPPORTED,
  MIME_BY_EXT,
} from '../constants';
import { convertHeic } from './heic';
import { convertWithCanvas } from './canvas';

function getDetectedFormat(file: File): 'HEIC' | 'image' | null {
  const mime = file.type?.toLowerCase();
  if (mime === 'image/heic' || mime === 'image/heif') return 'HEIC';
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (ext && MIME_BY_EXT[ext]) {
    const m = MIME_BY_EXT[ext];
    if (m === 'image/heic' || m === 'image/heif') return 'HEIC';
    if (m.startsWith('image/')) return 'image';
  }
  if (mime?.startsWith('image/')) return 'image';
  return null;
}

export function isConversionSupported(
  _sourceFormat: SourceFormat,
  targetFormat: TargetFormat,
  file: File
): boolean {
  if (TARGETS_UNSUPPORTED.includes(targetFormat)) return false;
  const detected = getDetectedFormat(file);
  if (detected === null) return false;
  return TARGETS_SUPPORTED_IN_BROWSER.includes(targetFormat);
}

export async function convertFile(
  file: File,
  _sourceFormat: SourceFormat,
  targetFormat: TargetFormat,
  quality: number
): Promise<ConversionResult> {
  if (TARGETS_UNSUPPORTED.includes(targetFormat)) {
    throw new Error(
      'Encoding to HEIC/HEIF is not supported in the browser. Use PNG or JPEG for best compatibility.'
    );
  }
  const detected = getDetectedFormat(file);
  if (detected === null) {
    throw new Error('Unsupported file type');
  }
  if (detected === 'HEIC') {
    return convertHeic(file, targetFormat, quality);
  }
  return convertWithCanvas(file, targetFormat, quality);
}
