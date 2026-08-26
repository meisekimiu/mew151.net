/**
 * An analogue of the XBM file format redesigned to match the spirit of XBM but in JavaScript.
 *
 * XBM was designed to be imported into C programs as a header file so that it can be included directly as C source code and be embedded directly into the compiled program. I feel like the equivalent of this in JavaScript is embedding something as JSON, so that's what this is designed as.
 * XBM is compiled into the C source as raw image bytes (and the dimension bytes if they are used in the program), so while it is an inefficient format for storing images directly, it's pretty compact in its compile targets.
 * To match this, we're using a Base-64 encoded string to store the binary image data as compactly as we can in a valid JavaScript string. To make the overall JSON package size as small as possible, the interface uses single character property names. And dimensions are stored in a single array (this saves 2 whole bytes. TWO OF THEM!)
 *
 * See: https://en.wikipedia.org/wiki/X_BitMap
 */
export interface JsbmImage {
  s: [number, number]; /** The dimensions of the image [width, height] */
  d: string; /** The image data in Base-64 encoding */
}
