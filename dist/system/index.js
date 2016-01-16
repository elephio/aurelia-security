System.register(["./auth-http-client", "./auth-service", "./auth-step"], function (_export) {
  "use strict";

  var AuthHttpClient;

  _export("configure", configure);

  function configure(aurelia, configCallback) {
    aurelia.globalResources('./auth-filter');

    var config = aurelia.container.get(AuthHttpClient);
    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(config);
    }
  }

  return {
    setters: [function (_authHttpClient) {
      AuthHttpClient = _authHttpClient.AuthHttpClient;

      _export("AuthHttpClient", _authHttpClient.AuthHttpClient);
    }, function (_authService) {
      _export("AuthService", _authService.AuthService);
    }, function (_authStep) {
      _export("AuthStep", _authStep.AuthStep);
    }],
    execute: function () {}
  };
});