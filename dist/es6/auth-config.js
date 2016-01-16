import {inject, LogManager} from "aurelia-framework";
import {HttpClient} from 'aurelia-fetch-client';
let LOG = LogManager.getLogger('config');

@inject(HttpClient)
export class AuthConfig {

  constructor(http) {
    this.http = http;
    this.baseConfig = {
      authBaseUrl: '/',
      authHeaderName: 'X-AUTH-TOKEN',
      authPath: 'auth',
      fetchInterceptor: true,
      loginRoot: 'login',
      loginRedirect: '/',
      loginUrl: '/',
      mode: 'no-cors',
      passwordField: 'password',
      storageKey: 'aurelia-security-token',
      usernameField: 'username'
    }
  }

  get current() {
    return this.merged !== undefined ? this.merged : this.baseConfig;
  }

  override(config) {
    LOG.debug("Overriding Base AuthConfig...");
    this.merged = {};
    for (var key in this.baseConfig) this.merged[key] = this.baseConfig[key];
    for (var key in config) this.merged[key] = config[key];
  }
}
