"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _aureliaFramework = require("aurelia-framework");

var _authConfig = require("./auth-config");

var _auth = require("./auth");

var _aureliaFetchClient = require("aurelia-fetch-client");

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
      LOG.debug("Configuring AuthHttpClient with interceptor.");
      if (config !== undefined) {
        this.authConfig.override(config);
      }

      var currentConfig = this.authConfig.current;
      var auth = this.auth;

      this.http.configure(function (fetchConfig) {
        fetchConfig.withBaseUrl(currentConfig.authBaseUrl).withInterceptor({
          request: function request(_request) {
            if (auth.isAuthenticated && currentConfig.fetchInterceptor) {
              var token = auth.getToken();
              _request.headers.append(currentConfig.authHeaderName, token);
            }
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