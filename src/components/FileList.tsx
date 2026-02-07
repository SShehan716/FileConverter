import type { FileRecord } from '../lib/conversion/types';

interface FileListProps {
  files: FileRecord[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileList({ files, onRemove, onClearAll }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <section className="file-list" aria-label="Queued files">
      <div className="file-list__header">
        <span>{files.length} file(s)</span>
        <button type="button" className="file-list__clear" onClick={onClearAll}>
          Clear all
        </button>
      </div>
      <ul className="file-list__items">
        {files.map((rec) => (
          <li key={rec.id} className="file-list__item" data-status={rec.status}>
            <div className="file-list__preview">
              {rec.previewUrl ? (
                <img src={rec.previewUrl} alt="" width={48} height={48} />
              ) : rec.status === 'pending' || rec.status === 'converting' ? (
                <div className="file-list__thumb-placeholder" />
              ) : rec.status === 'error' ? (
                <div className="file-list__thumb-error" aria-hidden />
              ) : null}
            </div>
            <div className="file-list__info">
              <span className="file-list__name" title={rec.file.name}>
                {rec.file.name}
              </span>
              <span className="file-list__meta">
                {formatSize(rec.file.size)}
                {rec.status === 'converting' && ' · Converting…'}
                {rec.status === 'done' && ' · Done'}
                {rec.status === 'error' && rec.error && ` · ${rec.error}`}
              </span>
            </div>
            <button
              type="button"
              className="file-list__remove"
              onClick={() => onRemove(rec.id)}
              aria-label={`Remove ${rec.file.name}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
