import type { ConversionResult } from './types';
import type { SourceFormat, TargetFormat } from '../constants';
import { HEIC_TARGETS, MIME_BY_EXT } from '../constants';
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
  const detected = getDetectedFormat(file);
  if (detected === null) return false;
  if (detected === 'HEIC') {
    return HEIC_TARGETS.includes(targetFormat);
  }
  return ['PNG', 'JPEG', 'WebP'].includes(targetFormat);
}

export async function convertFile(
  file: File,
  _sourceFormat: SourceFormat,
  targetFormat: TargetFormat,
  quality: number
): Promise<ConversionResult> {
  const detected = getDetectedFormat(file);
  if (detected === null) {
    throw new Error('Unsupported file type');
  }
  if (detected === 'HEIC') {
    if (!HEIC_TARGETS.includes(targetFormat)) {
      throw new Error('HEIC can only be converted to PNG or JPEG');
    }
    return convertHeic(file, targetFormat, quality);
  }
  return convertWithCanvas(file, targetFormat, quality);
}
