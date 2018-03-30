# MEAN-RSVP-Auth0

This is the sample repository for the Real-World Angular Series of tutorials. Begin the tutorials here: [Real-World Angular Series - Part 1](https://auth0.com/blog/real-world-angular-series-part-1).

## Requirements

* Node + npm
* Angular CLI

## Install

Clone this repository, then run:

```
$ npm install
```

## Setup Configuration for Node and Angular
* Add your Auth0 credentials<br>
**Angular** ->  <br>
`src/app/auth/auth.config.ts`<br>
**Node** -><br>
remove `.SAMPLE`: <br>
`server/config.js.SAMPLE`<br>
`/server/config.js'



## Setup Adminstrator
* In order to add events a user will need to gain administrator access. 
* To add administrator access to a user you will need to set up **2 seperate** Auth0 rules. To set up Auth0 rules please refer to the excellent blog post available at 'https://auth0.com/blog/real-world-angular-series-part-2/#admin-authorization' 
* Take special notice that in your current configuration files listed above that **Namespace**:
is set to:
```
NAMESPACE: 'http://myapp.com/roles' 
```
you need to update the  rules implementation's **context.idToken** in the (Auth0 dashboard)['https://manage.auth0.com/#/rules/'] to use that **Namespace** in the configuration files. The inital rule may use a different default such as below:
```
context.idToken['https://example.com/roles'] = user.app_metadata.roles;
```
would need to be the same as your **Namespace** 
```
context.idToken['http://myapp.com/roles'] = user.app_metadata.roles;
```



## Development server

```bash
$ ng serve // client
$ NODE_ENV=dev nodemon server // server
```

Available at `http://localhost:4200`. 

## Build (local)

```
$ ng build --prod // client
$ node server // server
```

Available on `http://localhost:8083`.

## Deploy

To deploy the app in this repo to a production environment, follow the instructions here: [Real-World Angular Series - Part 8](https://auth0.com/blog/real-world-angular-series-part-8/#deploy).

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub, or Microsoft Account to log in.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
