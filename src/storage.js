import {inject, LogManager} from "aurelia-framework";
import {AuthConfig} from "./auth-config";

let LOG = LogManager.getLogger("aurelia-security");

@inject(AuthConfig)
export class Storage {

  constructor(config) {
    this.config = config.current;
  }

  get(key) {
    if ('localStorage' in window && window['localStorage'] !== null) {
      return localStorage.getItem(key);
    } else {
      LOG.warn('Warning: Local Storage is disabled or unavailable');
      return undefined;
    }
  }

  set(key, value) {
    if ('localStorage' in window && window['localStorage'] !== null) {
      return localStorage.setItem(key, value);
    } else {
      LOG.warn('Warning: Local Storage is disabled or unavailable');
      return undefined;
    }
  }

  remove(key) {
    if ('localStorage' in window && window['localStorage'] !== null) {
      return localStorage.removeItem(key);
    } else {
      LOG.warn('Warning: Local Storage is disabled or unavailable');
      return undefined;
    }
  }
}
