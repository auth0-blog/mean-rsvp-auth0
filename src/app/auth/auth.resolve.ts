import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthResolve implements Resolve<Observable<boolean>> {
  constructor(private auth: AuthService) {}

  resolve() {
    return of(this.auth.loggedIn$);
  }
}
