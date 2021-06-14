import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeLinq, IEnumerable } from "linq-to-typescript"

if (environment.production) {
  enableProdMode();
}

declare global {
  interface Array<T> extends IEnumerable<T> { }
  interface Uint8Array extends IEnumerable<number> { }
  interface Uint8ClampedArray extends IEnumerable<number> { }
  interface Uint16Array extends IEnumerable<number> { }
  interface Uint32Array extends IEnumerable<number> { }
  interface Int8Array extends IEnumerable<number> { }
  interface Int16Array extends IEnumerable<number> { }
  interface Int32Array extends IEnumerable<number> { }
  interface Float32Array extends IEnumerable<number> { }
  interface Float64Array extends IEnumerable<number> { }
  interface Map<K, V> extends IEnumerable<[K, V]> { }
  interface Set<T> extends IEnumerable<T> { }
  interface String extends IEnumerable<string> { }
}

initializeLinq();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
