import type { FileRecord } from '../lib/conversion/types';

interface ProgressAndDownloadProps {
  files: FileRecord[];
  isConverting: boolean;
  progress: { current: number; total: number };
  onConvertAll: () => void;
  onDownloadAll: () => void;
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ProgressAndDownload({
  files,
  isConverting,
  progress,
  onConvertAll,
  onDownloadAll,
}: ProgressAndDownloadProps) {
  const pendingCount = files.filter((f) => f.status === 'pending' || f.status === 'error').length;
  const doneCount = files.filter((f) => f.status === 'done').length;
  const canConvert = pendingCount > 0 && !isConverting;
  const canDownloadAll = doneCount > 1;

  return (
    <section className="progress-download" aria-label="Convert and download">
      {isConverting && (
        <div className="progress-download__bar">
          <div
            className="progress-download__fill"
            style={{ width: progress.total ? `${(progress.current / progress.total) * 100}%` : 0 }}
          />
          <span className="progress-download__label">
            Converting {progress.current} of {progress.total}
          </span>
        </div>
      )}
      <div className="progress-download__actions">
        <button
          type="button"
          className="progress-download__btn progress-download__btn--primary"
          onClick={onConvertAll}
          disabled={!canConvert}
        >
          {isConverting ? 'Converting…' : 'Convert all'}
        </button>
        {canDownloadAll && (
          <button
            type="button"
            className="progress-download__btn"
            onClick={onDownloadAll}
          >
            Download all as ZIP
          </button>
        )}
      </div>
      <ul className="progress-download__results">
        {files
          .filter((f) => f.status === 'done' && f.resultBlob && f.resultName)
          .map((f) => (
            <li key={f.id} className="progress-download__result">
              <span className="progress-download__result-name">{f.resultName}</span>
              <button
                type="button"
                className="progress-download__result-dl"
                onClick={() => downloadBlob(f.resultBlob!, f.resultName!)}
              >
                Download
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
