import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorage: Storage;

  private readonly configKey = 'bumblebeeconfig';

  constructor() {
    this.localStorage = environment.production ? window.localStorage : window.sessionStorage;
  }

  get(key: string): any {
      return JSON.parse(this.localStorage.getItem(key));
  }

  getConfig(): BumbleBeeConfig {
    return JSON.parse(this.localStorage.getItem(this.configKey));
  }

  set(key: string, value: any): void {
      this.localStorage.setItem(key, JSON.stringify(value));
  }

  setConfig(config: BumbleBeeConfig): void {
    this.localStorage.setItem(this.configKey, JSON.stringify(config));
  }

  remove(key: string): void {
      this.localStorage.removeItem(key);
  }
}

export class BumbleBeeConfig {
  userId: number;
  userName: string;
  auctionCode: string;
}
