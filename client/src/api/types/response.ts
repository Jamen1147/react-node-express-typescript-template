export default class Response<T> {
  public value: T;

  public error: string | null;

  public get hasError(): boolean {
    return this.error !== null;
  }

  constructor(value: T, error = null) {
    this.value = value;
    this.error = error;
  }
}
