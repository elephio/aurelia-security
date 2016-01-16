import {inject, LogManager} from "aurelia-framework";
import {HttpClient, json} from "aurelia-fetch-client";
import {Auth} from "./auth";
import {AuthConfig} from "./auth-config";

let LOG = LogManager.getLogger("aurelia-security")

@inject(HttpClient, Auth, AuthConfig)
export class AuthService {

  constructor(http, auth, config) {
    this.http = http;
    this.auth = auth;
    this.config = config.current;
  }

  login(username, password) {
    LOG.debug("Logging in...");
    let config = this.config;
    let credentials;
    if (typeof arguments[1] !== 'string') {
      credentials = arguments[0];
    } else {
      credentials = {};
      credentials[config.usernameField] = username;
      credentials[config.passwordField] = password;
    }

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.fetch('auth', {
        method: 'post',
        body: json(credentials),
        headers: headers
      })
      .then(response => {
        if (!response.ok) {
          return null
        }
        this.auth.setToken(response)

        if (this.config.loginRedirect) {
          LOG.debug(`Redirecting to ${this.config.loginRedirect}`);
          window.location.href = this.config.loginRedirect;
        }

        return response;
      })
      .catch(err => {
        LOG.error(err);
        return null
      });
  }

  logout(redirectUri) {
    return new Promise(resolve => {
      this.auth.removeToken();

      if (this.config.logoutRedirect) {
        window.location.href = this.config.logoutRedirect;
      } else if (this.config.loginUrl) {
        LOG.debug(`Redirecting to ${this.config.loginUrl}`);
        window.location.href = this.config.loginUrl;
      }
      resolve();
    });
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated;
  }

}
