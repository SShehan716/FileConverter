/**
 * Encode ImageData to 24-bit BMP as Blob (browser-safe, no Node Buffer).
 */
export function imageDataToBmpBlob(data: ImageData): Promise<Blob> {
  const { width, height, data: rgba } = data;
  const rowBytes = (3 * width + 3) & ~3;
  const rgbSize = rowBytes * height;
  const offset = 54;
  const fileSize = offset + rgbSize;

  const out = new Uint8Array(fileSize);
  const view = new DataView(out.buffer);

  let pos = 0;
  out[pos++] = 0x42; // 'B'
  out[pos++] = 0x4d; // 'M'
  view.setUint32(pos, fileSize, true); pos += 4;
  view.setUint32(pos, 0, true); pos += 4;
  view.setUint32(pos, offset, true); pos += 4;

  view.setUint32(pos, 40, true); pos += 4;   // header size
  view.setUint32(pos, width, true); pos += 4;
  view.setInt32(pos, -height, true); pos += 4; // top-down
  view.setUint16(pos, 1, true); pos += 2;     // planes
  view.setUint16(pos, 24, true); pos += 2;    // bits per pixel
  view.setUint32(pos, 0, true); pos += 4;     // compression
  view.setUint32(pos, rgbSize, true); pos += 4;
  view.setUint32(pos, 0, true); pos += 4;
  view.setUint32(pos, 0, true); pos += 4;
  view.setUint32(pos, 0, true); pos += 4;
  view.setUint32(pos, 0, true); pos += 4;

  const padding = rowBytes - 3 * width;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      out[pos++] = rgba[i + 2]; // B
      out[pos++] = rgba[i + 1]; // G
      out[pos++] = rgba[i];     // R
    }
    for (let p = 0; p < padding; p++) out[pos++] = 0;
  }

  return Promise.resolve(new Blob([out], { type: 'image/bmp' }));
}
