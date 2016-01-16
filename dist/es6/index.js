export {AuthService} from "./auth-service";
export {AuthStep} from "./auth-step";
export {AuthHttpClient} from "./auth-http-client";
import {AuthHttpClient} from "./auth-http-client";

export function configure(aurelia, configCallback) {
  aurelia.globalResources('./auth-filter');

  let config = aurelia.container.get(AuthHttpClient);
  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(config);
  }
}
