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
  { value: 'JPEG', label: 'JPEG' },
  { value: 'PNG', label: 'PNG' },
  { value: 'WebP', label: 'WebP' },
  { value: 'GIF', label: 'GIF' },
  { value: 'BMP', label: 'BMP' },
  { value: 'HEIC', label: 'HEIC' },
  { value: 'HEIF', label: 'HEIF' },
] as const;

export type SourceFormat = (typeof SOURCE_FORMATS)[number]['value'];
export type TargetFormat = (typeof TARGET_FORMATS)[number]['value'];

/** Targets we can encode in the browser */
export const TARGETS_SUPPORTED_IN_BROWSER: TargetFormat[] = [
  'JPEG',
  'PNG',
  'WebP',
  'GIF',
  'BMP',
];

/** Targets with no browser encoder (show in UI but disabled) */
export const TARGETS_UNSUPPORTED: TargetFormat[] = ['HEIC', 'HEIF'];

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
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  WebP: 'image/webp',
  GIF: 'image/gif',
  BMP: 'image/bmp',
  HEIC: 'image/heic',
  HEIF: 'image/heif',
};

export const EXT_FOR_TARGET: Record<TargetFormat, string> = {
  JPEG: 'jpg',
  PNG: 'png',
  WebP: 'webp',
  GIF: 'gif',
  BMP: 'bmp',
  HEIC: 'heic',
  HEIF: 'heif',
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
