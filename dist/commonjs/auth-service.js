"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _aureliaFramework = require("aurelia-framework");

var _aureliaFetchClient = require("aurelia-fetch-client");

var _auth = require("./auth");

var _authConfig = require("./auth-config");

var LOG = _aureliaFramework.LogManager.getLogger("aurelia-security");

var AuthService = (function () {
  function AuthService(http, auth, config) {
    _classCallCheck(this, _AuthService);

    this.http = http;
    this.auth = auth;
    this.config = config.current;
  }

  _createClass(AuthService, [{
    key: "login",
    value: function login(username, password) {
      var _this = this;

      LOG.debug("Logging in...");
      var config = this.config;
      var credentials = undefined;
      if (typeof arguments[1] !== 'string') {
        credentials = arguments[0];
      } else {
        credentials = {};
        credentials[config.usernameField] = username;
        credentials[config.passwordField] = password;
      }

      var headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      return this.http.fetch('auth', {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(credentials),
        headers: headers
      }).then(function (response) {
        if (!response.ok) {
          return response;
        }
        _this.auth.setToken(response);

        if (_this.config.loginRedirect) {
          LOG.debug("Redirecting to " + _this.config.loginRedirect);
          window.location.href = _this.config.loginRedirect;
        }
        return response;
      })["catch"](function (err) {
        LOG.error(err);
        return err;
      });
    }
  }, {
    key: "logout",
    value: function logout(redirectUri) {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.auth.removeToken();

        if (_this2.config.logoutRedirect) {
          window.location.href = _this2.config.logoutRedirect;
        } else if (_this2.config.loginUrl) {
          LOG.debug("Redirecting to " + _this2.config.loginUrl);
          window.location.href = _this2.config.loginUrl;
        }
        resolve();
      });
    }
  }, {
    key: "isAuthenticated",
    get: function get() {
      return this.auth.isAuthenticated;
    }
  }]);

  var _AuthService = AuthService;
  AuthService = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _auth.Auth, _authConfig.AuthConfig)(AuthService) || AuthService;
  return AuthService;
})();

exports.AuthService = AuthService;