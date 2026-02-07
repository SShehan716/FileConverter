export type FileStatus = 'pending' | 'converting' | 'done' | 'error';

export interface FileRecord {
  id: string;
  file: File;
  status: FileStatus;
  error?: string;
  resultBlob?: Blob;
  resultName?: string;
  previewUrl?: string;
}

export interface ConversionResult {
  blob: Blob;
  name: string;
}

import type { SourceFormat, TargetFormat } from '../constants';

export interface ConversionOptions {
  sourceFormat: SourceFormat;
  targetFormat: TargetFormat;
  quality: number;
}
