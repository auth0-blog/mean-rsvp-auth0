import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SILENT_REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '[AUTH0_CLIENT_ID]',
  CLIENT_DOMAIN: '[AUTH0_CLIENT_DOMAIN]', // ie., kmaida.auth0.com
  AUDIENCE: '[YOUR_AUTH0_API_AUDIENCE]', // ie., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SILENT_REDIRECT: `${ENV.BASE_URI}/silent`,
  SCOPE: 'openid profile',
  NAMESPACE: 'http://myapp.com/roles'
};
