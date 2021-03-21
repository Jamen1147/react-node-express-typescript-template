import { parse, stringify } from '@template/common';

type Pair = {
  token: string;
  exmaple: number;
};

type Key = keyof Pair;

class Storage {
  static get<T extends Key>(key: T): Pair[T] | null {
    return parse(localStorage.getItem(key));
  }

  static set<T extends Key>(key: T, value: Pair[T]) {
    localStorage.setItem(
      key,
      typeof value === 'object' ? stringify(value) : `${value}`
    );
  }

  static remove(key: Key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default Storage;
