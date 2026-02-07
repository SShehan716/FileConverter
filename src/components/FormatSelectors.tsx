import type { SourceFormat, TargetFormat } from '../lib/constants';
import {
  SOURCE_FORMATS,
  TARGET_FORMATS,
  TARGETS_UNSUPPORTED,
} from '../lib/constants';

interface FormatSelectorsProps {
  sourceFormat: SourceFormat;
  targetFormat: TargetFormat;
  onSourceChange: (v: SourceFormat) => void;
  onTargetChange: (v: TargetFormat) => void;
}

export default function FormatSelectors({
  sourceFormat,
  targetFormat,
  onSourceChange,
  onTargetChange,
}: FormatSelectorsProps) {
  return (
    <section className="format-selectors" aria-label="Conversion format">
      <div className="selector-row">
        <label htmlFor="source-format">From</label>
        <select
          id="source-format"
          value={sourceFormat}
          onChange={(e) => onSourceChange(e.target.value as SourceFormat)}
        >
          {SOURCE_FORMATS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="selector-row">
        <label htmlFor="target-format">To</label>
        <select
          id="target-format"
          value={targetFormat}
          onChange={(e) => onTargetChange(e.target.value as TargetFormat)}
        >
          {TARGET_FORMATS.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              disabled={TARGETS_UNSUPPORTED.includes(value)}
              title={TARGETS_UNSUPPORTED.includes(value) ? 'Encoding to HEIC/HEIF is not supported in the browser.' : undefined}
            >
              {label}
            </option>
          ))}
        </select>
      </div>
      <p className="heic-hint">
        Convert to any supported format. HEIC/HEIF encoding is not available in the browser.
      </p>
    </section>
  );
}
