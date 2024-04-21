import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$ = new Subject<boolean>();

  private count = 0;

  show() {
    this.count += 1;

    if (this.count === 1) {
      setTimeout(() => this.loading$.next(true), 0);
    }
  }

  hide() {
    this.count -= 1;

    if (this.count === 0) {
      setTimeout(() => this.loading$.next(false), 0);
    }
  }
}
