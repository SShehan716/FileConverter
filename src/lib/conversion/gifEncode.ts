import { GIFEncoder, quantize, applyPalette } from 'gifenc';

/**
 * Encode ImageData to single-frame GIF Blob.
 */
export function imageDataToGifBlob(data: ImageData): Promise<Blob> {
  const { data: rgba, width, height } = data;
  const palette = quantize(rgba, 256);
  const index = applyPalette(rgba, palette);
  const gif = GIFEncoder();
  gif.writeFrame(index, width, height, { palette });
  gif.finish();
  const bytes = gif.bytes();
  return Promise.resolve(new Blob([bytes as BlobPart], { type: 'image/gif' }));
}
