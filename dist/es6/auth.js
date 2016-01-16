import {inject, LogManager} from "aurelia-framework";
import {Storage} from "./storage";
import {AuthConfig} from "./auth-config";

let LOG = LogManager.getLogger("aurelia-security");

@inject(AuthConfig, Storage)
export class Auth {

  constructor(config, storage) {
    this.config = config.current;
    this.storage = storage;
  }

  getToken() {
    return this.storage.get(this.config.storageKey);
  }

  setToken(response) {
    let token = response.headers.get(this.config.authHeaderName);
    if(token) {
      LOG.debug(`Setting token in local storage: ${token}`)
      this.storage.set(this.config.storageKey, token);
    }
  }

  removeToken() {
    this.storage.remove(this.config.storageKey);
  }

  isAuthenticated() {
    let token = this.getToken();
    if (token) {
      let sections = token.split('.');

      let base64Url = sections[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var exp = JSON.parse(window.atob(base64)).exp;

      if (exp) {
        return Math.round(new Date().getTime() / 1000) <= exp;
      }

      //for right now, let's just assume the jwt is valid...
      return true;
    }
    return false;
  }
}
