import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageInternal: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storageInternal = storage;
  }

  set(key: string, value: any) {
    this.storageInternal?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this.storageInternal?.get(key);
  }
}
