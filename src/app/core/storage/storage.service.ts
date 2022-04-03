import { Injectable } from '@angular/core';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this._storage?.get(key);
  }

  async remove(key: string) {
    await this._storage?.remove(key);
  }

  async keys(): Promise<string[] | undefined> {
    return await this._storage?.keys();
  }

  async clear() {
    await this._storage?.clear();
  }
}
