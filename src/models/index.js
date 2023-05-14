export class ApiResult {
  static SUCCESS = 0;
  static FAILED = -1;

  constructor(status, data = null, error = null) {
    this.status = status;
    this.data = data;
    this.error = error;
  }
}
