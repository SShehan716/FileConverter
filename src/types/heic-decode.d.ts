declare module 'heic-decode' {
  interface DecodeResult {
    width: number;
    height: number;
    data: Uint8ClampedArray;
  }
  function one(opts: { buffer: ArrayBuffer | Uint8Array }): Promise<DecodeResult>;
  function all(opts: { buffer: ArrayBuffer | Uint8Array }): Promise<unknown[]>;
  export default one;
  export { all };
}
