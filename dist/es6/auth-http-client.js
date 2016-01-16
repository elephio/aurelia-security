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
    LOG.debug("Configuring AuthHttpClient");
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
          LOG.debug(`${auth.isAuthenticated()} and ${currentConfig.fetchInterceptor}`);
          if (auth.isAuthenticated() && currentConfig.fetchInterceptor) {
            LOG.debug(`Setting header ${currentConfig.authHeaderName} with token`);
            let token = auth.getToken();
            request.headers.append(currentConfig.authHeaderName, token);
          }
          LOG.debug(`access-control-allow-headers: ${request.headers.getAll("access-control-allow-headers")}`);
          LOG.debug(request.headers.get(currentConfig.authHeaderName));
          return request;
        }
      });
    })
  }
}
