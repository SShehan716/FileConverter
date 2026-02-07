export const SOURCE_FORMATS = [
  { value: 'auto', label: 'Auto from file' },
  { value: 'HEIC', label: 'HEIC / HEIF' },
  { value: 'JPEG', label: 'JPEG' },
  { value: 'PNG', label: 'PNG' },
  { value: 'WebP', label: 'WebP' },
  { value: 'GIF', label: 'GIF' },
  { value: 'BMP', label: 'BMP' },
] as const;

export const TARGET_FORMATS = [
  { value: 'PNG', label: 'PNG' },
  { value: 'JPEG', label: 'JPEG' },
  { value: 'WebP', label: 'WebP' },
] as const;

export type SourceFormat = (typeof SOURCE_FORMATS)[number]['value'];
export type TargetFormat = (typeof TARGET_FORMATS)[number]['value'];

/** For HEIC source, only PNG and JPEG are valid targets */
export const HEIC_TARGETS: TargetFormat[] = ['PNG', 'JPEG'];

export const MIME_BY_EXT: Record<string, string> = {
  heic: 'image/heic',
  heif: 'image/heif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  bmp: 'image/bmp',
};

export const EXT_BY_MIME: Record<string, string> = {
  'image/heic': 'heic',
  'image/heif': 'heif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
};

export const MIME_FOR_TARGET: Record<TargetFormat, string> = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  WebP: 'image/webp',
};

export const EXT_FOR_TARGET: Record<TargetFormat, string> = {
  PNG: 'png',
  JPEG: 'jpg',
  WebP: 'webp',
};

export const ACCEPT_IMAGE = [
  'image/heic',
  'image/heif',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
].join(',');

export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILES = 20;
