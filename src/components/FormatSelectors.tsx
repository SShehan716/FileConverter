import type { SourceFormat, TargetFormat } from '../lib/constants';
import {
  SOURCE_FORMATS,
  TARGET_FORMATS,
  HEIC_TARGETS,
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
  const targetOptions = sourceFormat === 'HEIC' ? HEIC_TARGETS : TARGET_FORMATS.map((t) => t.value);

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
          {TARGET_FORMATS.filter((t) => targetOptions.includes(t.value)).map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {sourceFormat === 'HEIC' && (
        <p className="heic-hint">HEIC / HEIF can be converted to PNG or JPEG.</p>
      )}
    </section>
  );
}
