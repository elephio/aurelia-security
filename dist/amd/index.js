define(["exports", "./auth-http-client", "./auth-service", "./auth-step"], function (exports, _authHttpClient, _authService, _authStep) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function get() {
      return _authService.AuthService;
    }
  });
  Object.defineProperty(exports, "AuthStep", {
    enumerable: true,
    get: function get() {
      return _authStep.AuthStep;
    }
  });
  Object.defineProperty(exports, "AuthHttpClient", {
    enumerable: true,
    get: function get() {
      return _authHttpClient.AuthHttpClient;
    }
  });

  function configure(aurelia, configCallback) {
    aurelia.globalResources('./auth-filter');

    var config = aurelia.container.get(_authHttpClient.AuthHttpClient);
    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }
  }
});