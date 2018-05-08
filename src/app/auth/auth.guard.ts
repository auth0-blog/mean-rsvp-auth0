import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Set auth redirect
    localStorage.setItem('authRedirect', state.url);
    if (this.auth.tokenValid) {
      return true;
    } else {
      // Send guarded route to redirect to after logging in
      this.auth.login();
      return false;
    }
  }

}
