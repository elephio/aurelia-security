System.register(["aurelia-framework", "./auth-config", "./auth", "aurelia-fetch-client"], function (_export) {
  "use strict";

  var inject, LogManager, AuthConfig, Auth, HttpClient, json, LOG, AuthHttpClient;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_authConfig) {
      AuthConfig = _authConfig.AuthConfig;
    }, function (_auth) {
      Auth = _auth.Auth;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
      json = _aureliaFetchClient.json;
    }],
    execute: function () {
      LOG = LogManager.getLogger('aurelia-security');

      AuthHttpClient = (function () {
        function AuthHttpClient(authConfig, auth, http) {
          _classCallCheck(this, _AuthHttpClient);

          this.authConfig = authConfig;
          this.auth = auth;
          this.http = http;
        }

        _createClass(AuthHttpClient, [{
          key: "configure",
          value: function configure(config) {
            LOG.debug("Configuring AuthHttpClient");
            if (config !== undefined) {
              this.authConfig.override(config);
            }

            var currentConfig = this.authConfig.current;
            var auth = this.auth;

            this.http.configure(function (fetchConfig) {
              fetchConfig.withBaseUrl(currentConfig.authBaseUrl).withInterceptor({
                request: function request(_request) {
                  LOG.debug(auth.isAuthenticated() + " and " + currentConfig.fetchInterceptor);
                  if (auth.isAuthenticated() && currentConfig.fetchInterceptor) {
                    LOG.debug("Setting header " + currentConfig.authHeaderName + " with token");
                    var token = auth.getToken();
                    _request.headers.append(currentConfig.authHeaderName, token);
                  }
                  LOG.debug("access-control-allow-headers: " + _request.headers.getAll("access-control-allow-headers"));
                  LOG.debug(_request.headers.get(currentConfig.authHeaderName));
                  return _request;
                }
              });
            });
          }
        }]);

        var _AuthHttpClient = AuthHttpClient;
        AuthHttpClient = inject(AuthConfig, Auth, HttpClient)(AuthHttpClient) || AuthHttpClient;
        return AuthHttpClient;
      })();

      _export("AuthHttpClient", AuthHttpClient);
    }
  };
});