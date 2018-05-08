import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: '[AUTH0_CLIENT_ID]',
  CLIENT_DOMAIN: '[AUTH0_CLIENT_DOMAIN]', // e.g., kmaida.auth0.com
  AUDIENCE: '[YOUR_AUTH0_API_AUDIENCE]', // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile email',
  NAMESPACE: 'http://myapp.com/roles'
};
