# File Converter

A browser-based file converter that runs entirely on your device. Convert between image formats including **HEIC to PNG**, JPEG, WebP, and more. No uploads—all processing happens locally.

## Features

- **Format selection**: Choose source format (Auto, HEIC, JPEG, PNG, WebP, GIF, BMP) and target format (PNG, JPEG, WebP). HEIC/HEIF convert to PNG or JPEG.
- **Drag and drop** or click to select files; paste from clipboard (e.g. screenshots).
- **File list** with thumbnails, size, and status (pending / converting / done / error). Remove single file or clear all.
- **Quality slider** for JPEG and WebP output (0.1–1.0).
- **Batch convert**: Convert all queued files; progress bar (e.g. “Converting 3 of 10”).
- **Download**: Per-file download after conversion; “Download all as ZIP” when multiple files are converted.
- **Dark/light theme** toggle with system preference detection.

## Supported conversions

| Source        | Target   |
|---------------|----------|
| HEIC, HEIF    | PNG, JPEG |
| JPEG, PNG, WebP, GIF, BMP | PNG, JPEG, WebP |

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Tech stack

- React 18 + TypeScript + Vite
- [heic-convert](https://www.npmjs.com/package/heic-convert) (browser build) for HEIC → PNG/JPEG
- Canvas API for other image format conversions
- JSZip for “Download all as ZIP”

Limits: max 20 files per batch, 50 MB per file (configurable in `src/lib/constants.ts`).
