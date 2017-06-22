import { Component, OnInit } from '@angular/core';
import { ENV } from './../../core/env.config';
import { AUTH_CONFIG } from './../../auth/auth.config';
import auth0 from 'auth0-js';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
