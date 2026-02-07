interface ConversionOptionsProps {
  quality: number;
  onQualityChange: (v: number) => void;
}

export default function ConversionOptions({ quality, onQualityChange }: ConversionOptionsProps) {
  return (
    <section className="conversion-options" aria-label="Conversion options">
      <div className="quality-row">
        <label htmlFor="quality-slider">
          JPEG / WebP quality: <strong>{Math.round(quality * 100)}%</strong>
        </label>
        <input
          id="quality-slider"
          type="range"
          min={0.1}
          max={1}
          step={0.01}
          value={quality}
          onChange={(e) => onQualityChange(Number(e.target.value))}
        />
      </div>
    </section>
  );
}
