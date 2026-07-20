/** An error that is thrown when an operation is done on a Vector that needs a non-zero magnitude. */
export class ZeroMagnitudeError extends Error {
  constructor(message: string) {
    super(`ZeroMagnitudeError: ${message}`);
  }
}
