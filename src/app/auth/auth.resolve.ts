import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthResolve implements Resolve<Observable<boolean>> {
  constructor(private auth: AuthService) {}

  resolve() {
    return of(this.auth.loggedIn$);
  }
}
