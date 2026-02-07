# File Converter

A browser-based file converter that runs entirely on your device. Convert between image formats including **HEIC to PNG**, JPEG, WebP, and more. No uploads—all processing happens locally.

## Features

- **Format selection**: Choose source format (Auto, HEIC, JPEG, PNG, WebP, GIF, BMP) and target format (JPEG, PNG, WebP, GIF, BMP). HEIC/HEIF encoding is not supported in the browser (options shown but disabled).
- **Drag and drop** or click to select files; paste from clipboard (e.g. screenshots).
- **File list** with thumbnails, size, and status (pending / converting / done / error). Remove single file or clear all.
- **Quality slider** for JPEG and WebP output (0.1–1.0).
- **Batch convert**: Convert all queued files; progress bar (e.g. “Converting 3 of 10”).
- **Download**: Per-file download after conversion; “Download all as ZIP” when multiple files are converted.
- **Dark/light theme** toggle with system preference detection.

## Supported conversions

Any supported image (HEIC, HEIF, JPEG, PNG, WebP, GIF, BMP) can be converted to:

| Target   | Supported in browser |
|----------|------------------------|
| JPEG     | Yes                    |
| PNG      | Yes                    |
| WebP     | Yes                    |
| GIF      | Yes (single-frame)     |
| BMP      | Yes                    |
| HEIC     | No (option disabled)   |
| HEIF     | No (option disabled)   |

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
- [heic-convert](https://www.npmjs.com/package/heic-convert) (browser) for HEIC → PNG/JPEG
- [heic-decode](https://www.npmjs.com/package/heic-decode) for HEIC → WebP/GIF/BMP
- Canvas API for PNG/JPEG/WebP and as base for GIF/BMP
- [gifenc](https://www.npmjs.com/package/gifenc) for GIF encoding
- Custom 24-bit BMP encoder (no Node Buffer)
- JSZip for “Download all as ZIP”

Limits: max 20 files per batch, 50 MB per file (configurable in `src/lib/constants.ts`).
