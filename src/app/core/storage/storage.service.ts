import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, filter, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    this.storageReady.next(true);
  }

  async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  async getAsync(key: string): Promise<any> {
    return await this.storage?.get(key);
  }

  get(key: string): Observable<any> {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap(() => from(this.storage.get(key)) || of(undefined)),
    );
  }

  async remove(key: string) {
    await this.storage?.remove(key);
  }

  async keys(): Promise<string[] | undefined> {
    return await this.storage?.keys();
  }

  async clear() {
    await this.storage?.clear();
  }
}
