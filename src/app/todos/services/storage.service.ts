import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  setItem(key: string, value: any) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  getItem(key: string) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  clear() {
    localStorage.clear();
  }
}
