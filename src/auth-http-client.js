import {inject, LogManager} from "aurelia-framework";
import {AuthConfig} from "./auth-config";
import {Auth} from "./auth";
import {HttpClient, json} from "aurelia-fetch-client";

let LOG = LogManager.getLogger('aurelia-security');

@inject(AuthConfig, Auth, HttpClient)
export class AuthHttpClient {

  constructor(authConfig, auth, http) {
    this.authConfig = authConfig;
    this.auth = auth;
    this.http = http;
  }

  configure(config) {
    LOG.debug("Configuring AuthHttpClient with interceptor.");
    if (config !== undefined) {
      this.authConfig.override(config);
    }

    //since we're referencing variables within the closure, need to declare them vs. using this.
    let currentConfig = this.authConfig.current;
    let auth = this.auth;

    this.http.configure(fetchConfig => {
      fetchConfig
        .withBaseUrl(currentConfig.authBaseUrl)
      .withInterceptor({
        request(request) {
          LOG.debug(`${auth.isAuthenticated} and ${currentConfig.fetchInterceptor}`);
          if (auth.isAuthenticated && currentConfig.fetchInterceptor) {
            let token = auth.getToken();
            request.headers.append(currentConfig.authHeaderName, token);
          }
          return request;
        }
      });
    })
  }
}
