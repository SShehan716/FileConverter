import { useState, useCallback } from 'react';
import type { FileRecord } from '../lib/conversion/types';
import type { SourceFormat, TargetFormat } from '../lib/constants';
import { convertFile } from '../lib/conversion/router';
import { ACCEPT_IMAGE, MAX_FILE_SIZE_MB, MAX_FILES } from '../lib/constants';
import JSZip from 'jszip';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useConversion() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const acceptTypes = ACCEPT_IMAGE;
  const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles((prev) => {
      const filtered = newFiles.filter((f) => f.size <= maxBytes);
      const added: FileRecord[] = filtered.slice(0, MAX_FILES - prev.length).map((file) => ({
        id: generateId(),
        file,
        status: 'pending' as const,
      }));
      return [...prev, ...added].slice(0, MAX_FILES);
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const rec = prev.find((f) => f.id === id);
      if (rec?.previewUrl) URL.revokeObjectURL(rec.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      });
      return [];
    });
  }, []);

  const convertAll = useCallback(
    async (opts: { sourceFormat: SourceFormat; targetFormat: TargetFormat; quality: number }) => {
      const list = files.filter((f) => f.status === 'pending' || f.status === 'error');
      if (list.length === 0) return;
      setIsConverting(true);
      setProgress({ current: 0, total: list.length });
      for (let i = 0; i < list.length; i++) {
        const rec = list[i];
        setFiles((prev) =>
          prev.map((f) => (f.id === rec.id ? { ...f, status: 'converting' as const } : f))
        );
        setProgress({ current: i + 1, total: list.length });
        try {
          const result = await convertFile(rec.file, opts.sourceFormat, opts.targetFormat, opts.quality);
          const previewUrl = URL.createObjectURL(result.blob);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === rec.id
                ? {
                    ...f,
                    status: 'done' as const,
                    resultBlob: result.blob,
                    resultName: result.name,
                    previewUrl,
                    error: undefined,
                  }
                : f
            )
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Conversion failed';
          setFiles((prev) =>
            prev.map((f) =>
              f.id === rec.id ? { ...f, status: 'error' as const, error: message } : f
            )
          );
        }
      }
      setIsConverting(false);
    },
    [files]
  );

  const downloadAllAsZip = useCallback(async () => {
    const done = files.filter((f) => f.status === 'done' && f.resultBlob && f.resultName);
    if (done.length === 0) return;
    const zip = new JSZip();
    done.forEach((f, i) => {
      const name = f.resultName ?? `converted-${i}.png`;
      zip.file(name, f.resultBlob!);
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-files.zip';
    a.click();
    URL.revokeObjectURL(url);
  }, [files]);

  return {
    files,
    addFiles,
    removeFile,
    clearAll,
    convertAll,
    downloadAllAsZip,
    isConverting,
    progress,
    acceptTypes,
  };
}
