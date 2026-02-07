import { useCallback, useState, useEffect } from 'react';

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  accept: string;
}

export default function DropZone({ onFiles, accept }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind !== 'file') continue;
        const file = item.getAsFile();
        if (!file) continue;
        const isImage = item.type.startsWith('image/') || /\.(heic|heif)$/i.test(file.name);
        if (isImage) files.push(file);
      }
      if (files.length) {
        e.preventDefault();
        onFiles(files);
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [onFiles]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const list = Array.from(e.dataTransfer.files);
      const images = list.filter((f) => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name));
      if (images.length) onFiles(images);
    },
    [onFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files ? Array.from(e.target.files) : [];
      if (list.length) onFiles(list);
      e.target.value = '';
    },
    [onFiles]
  );

  return (
    <section
      className={`drop-zone ${isDragOver ? 'drop-zone--active' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      aria-label="Drop files or click to select"
    >
      <input
        type="file"
        accept={accept}
        multiple
        onChange={handleInputChange}
        className="drop-zone__input"
        id="file-input"
        aria-label="Choose image files"
      />
      <label htmlFor="file-input" className="drop-zone__label">
        Drag and drop files here, or click to choose
      </label>
    </section>
  );
}
