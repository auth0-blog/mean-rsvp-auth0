import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AUTH_CONFIG } from './auth.config';
import * as auth0 from 'auth0-js';
import { ENV } from './../core/env.config';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  accessToken: string;
  userProfile: any;
  isAdmin: boolean;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  // Subscribe to token expiration stream
  refreshSub: Subscription;

  constructor(private router: Router) {
    // Get token, if possible
    this.getToken();
  }

  setLoggedIn(value: boolean) {
    // Update login status behavior subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash(window.location.href, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        this._clearRedirect();
        this.router.navigate(['/']);
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        this._redirect();
        this._clearRedirect();
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile?) {
    // Set tokens and expiration in localStorage
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    this.accessToken = authResult.accessToken;
    localStorage.setItem('expires_at', expiresAt);
    // If initial login, set profile and admin information
    if (profile) {
      this.userProfile = profile;
      this.isAdmin = this._checkAdmin(profile);
    }
    // Update login status in loggedIn$ stream
    this.setLoggedIn(true);
    // Schedule access token renewal
    this.scheduleRenewal();
  }

  private _checkAdmin(profile) {
    // Check if the user has admin role
    const roles = profile[AUTH_CONFIG.NAMESPACE] || [];
    return roles.indexOf('admin') > -1;
  }

  private _redirect() {
    // Redirect with or without 'tab' query parameter
    // Note: does not support additional params besides 'tab'
    const fullRedirect = decodeURI(localStorage.getItem('authRedirect'));
    const redirectArr = fullRedirect.split('?tab=');
    const navArr = [redirectArr[0] || '/'];
    const tabObj = redirectArr[1] ? { queryParams: { tab: redirectArr[1] }} : null;

    console.log(fullRedirect, redirectArr);

    if (!tabObj) {
      this.router.navigate(navArr);
    } else {
      this.router.navigate(navArr, tabObj);
    }
  }

  private _clearRedirect() {
    // Remove redirect from localStorage
    localStorage.removeItem('authRedirect');
  }

  logout(noRedirect?: boolean) {
    localStorage.removeItem('expires_at');
    this._clearRedirect();
    this.accessToken = undefined;
    this.userProfile = undefined;
    this.isAdmin = undefined;
    this.setLoggedIn(false);
    // Unschedule access token renewal
    this.unscheduleRenewal();
    // Return to homepage
    if (noRedirect !== true) {
      this.router.navigate(['/']);
    }
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  getToken() {
    // Check for valid Auth0 session
    this._auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this._getProfile(authResult);
      } else {
        console.warn('Could not retrieve access token');
        if (err) {
          console.warn(err);
        }
        // Log out without redirecting to clear auth data
        this.logout(true);
        // Prompt user to log in again
        this.login();
      }
    });
  }

  scheduleRenewal() {
    // If user isn't authenticated, do nothing
    if (!this.tokenValid) { return; }
    // Unsubscribe from previous expiration observable
    this.unscheduleRenewal();
    // Create and subscribe to expiration observable
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const expiresIn$ = of(expiresAt).pipe(
      mergeMap(
        expires => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return timer(Math.max(1, expires - now));
        }
      )
    );

    this.refreshSub = expiresIn$
      .subscribe(
        () => {
          this.getToken();
          this.scheduleRenewal();
        }
      );
  }

  unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

}
