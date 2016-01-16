import {inject, LogManager} from "aurelia-framework";
import {Auth} from "./auth";
import {AuthConfig} from "./auth-config";
import {Redirect} from 'aurelia-router';
import {Router} from 'aurelia-router';

let LOG = LogManager.getLogger('aurelia-security');

@inject(AuthConfig, Auth, Router, Redirect)
export class AuthStep {

  constructor(config, auth) {
    this.config = config;
    this.auth = auth;
  }

  run(routingContext, next) {
    LOG.debug("Running AuthStep...");
    if(routingContext.getAllInstructions().some(i => i.config.auth)) {
      if(!this.auth.isAuthenticated) {
        LOG.debug("This route requires authentication. Redirecting to loginRedirect.");
        return next.cancel(new Redirect(this.config.loginUrl));
      }
      else if (this.auth.isAuthenticated && routingContext.getAllInstructions().some(i => i.fragment) == this.config.loginUrl) {
        var loginRedirect = this.auth.getLoginRedirect();
        return next.cancel(new Redirect(this.config.loginRedirect));
      }
    }

    return next();
  }
}
