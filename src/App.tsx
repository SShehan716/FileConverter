import { useState, useEffect } from 'react';
import FormatSelectors from './components/FormatSelectors';
import DropZone from './components/DropZone';
import FileList from './components/FileList';
import ConversionOptions from './components/ConversionOptions';
import ProgressAndDownload from './components/ProgressAndDownload';
import { useConversion } from './hooks/useConversion';
import type { SourceFormat, TargetFormat } from './lib/constants';

function App() {
  const [sourceFormat, setSourceFormat] = useState<SourceFormat>('auto');
  const [targetFormat, setTargetFormat] = useState<TargetFormat>('PNG');
  const [quality, setQuality] = useState(0.92);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const conversion = useConversion();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>File Converter</h1>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </header>
      <main className="app-main">
        <FormatSelectors
          sourceFormat={sourceFormat}
          targetFormat={targetFormat}
          onSourceChange={setSourceFormat}
          onTargetChange={setTargetFormat}
        />
        <DropZone onFiles={conversion.addFiles} accept={conversion.acceptTypes} />
        <FileList
          files={conversion.files}
          onRemove={conversion.removeFile}
          onClearAll={conversion.clearAll}
        />
        <ConversionOptions quality={quality} onQualityChange={setQuality} />
        <ProgressAndDownload
          files={conversion.files}
          isConverting={conversion.isConverting}
          progress={conversion.progress}
          onConvertAll={() => conversion.convertAll({ sourceFormat, targetFormat, quality })}
          onDownloadAll={conversion.downloadAllAsZip}
        />
      </main>
    </div>
  );
}

export default App;
