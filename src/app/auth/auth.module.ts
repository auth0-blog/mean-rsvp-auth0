import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';
import { authHttpFactory } from './auth-http.factory';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule { }
