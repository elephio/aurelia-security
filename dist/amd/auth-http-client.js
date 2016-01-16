define(["exports", "aurelia-framework", "./auth-config", "./auth", "aurelia-fetch-client"], function (exports, _aureliaFramework, _authConfig, _auth, _aureliaFetchClient) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var LOG = _aureliaFramework.LogManager.getLogger('aurelia-security');

  var AuthHttpClient = (function () {
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
              LOG.debug(auth.isAuthenticated + " and " + currentConfig.fetchInterceptor);
              if (auth.isAuthenticated && currentConfig.fetchInterceptor) {
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
    AuthHttpClient = (0, _aureliaFramework.inject)(_authConfig.AuthConfig, _auth.Auth, _aureliaFetchClient.HttpClient)(AuthHttpClient) || AuthHttpClient;
    return AuthHttpClient;
  })();

  exports.AuthHttpClient = AuthHttpClient;
});