declare module 'heic-convert/browser' {
  interface HeicConvertOptions {
    buffer: ArrayBuffer | Uint8Array;
    format: 'PNG' | 'JPEG';
    quality?: number;
  }
  function convert(options: HeicConvertOptions): Promise<ArrayBuffer | Uint8Array>;
  export default convert;
}
