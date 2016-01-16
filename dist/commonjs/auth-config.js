'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaFramework = require("aurelia-framework");

var _aureliaFetchClient = require('aurelia-fetch-client');

var LOG = _aureliaFramework.LogManager.getLogger('config');

var AuthConfig = (function () {
  function AuthConfig(http) {
    _classCallCheck(this, _AuthConfig);

    this.http = http;
    this.baseConfig = {
      authBaseUrl: '/',
      authHeaderName: 'X-AUTH-TOKEN',
      authPath: 'auth',
      fetchInterceptor: true,
      loginRoot: 'login',
      loginRedirect: '/',
      loginUrl: '/',
      mode: 'no-cors',
      passwordField: 'password',
      storageKey: 'aurelia-security-token',
      usernameField: 'username'
    };
  }

  _createClass(AuthConfig, [{
    key: 'override',
    value: function override(config) {
      LOG.debug("Overriding Base AuthConfig...");
      this.merged = {};
      for (var key in this.baseConfig) this.merged[key] = this.baseConfig[key];
      for (var key in config) this.merged[key] = config[key];
    }
  }, {
    key: 'current',
    get: function get() {
      return this.merged !== undefined ? this.merged : this.baseConfig;
    }
  }]);

  var _AuthConfig = AuthConfig;
  AuthConfig = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient)(AuthConfig) || AuthConfig;
  return AuthConfig;
})();

exports.AuthConfig = AuthConfig;