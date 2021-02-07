/* eslint-disable class-methods-use-this */
import { parse, stringify } from './transform';

class StorageHelper {
  private getItem<T>(key: string): T | null {
    return parse(localStorage.getItem(key));
  }

  private setItem<T>(key: string, value: T) {
    localStorage.setItem(
      key,
      // eslint-disable-next-line prefer-template
      typeof value === 'object' ? stringify(value) : value + ''
    );
  }

  private removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  get token() {
    return this.getItem('token');
  }

  set token(value: string | null) {
    if (value === null) {
      this.removeItem('token');
    } else {
      this.setItem('token', value);
    }
  }
}

const storage = new StorageHelper();
export default storage;
