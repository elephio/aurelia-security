define(["exports", "aurelia-framework", "./storage", "./auth-config"], function (exports, _aureliaFramework, _storage, _authConfig) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var LOG = _aureliaFramework.LogManager.getLogger("aurelia-security");

  var Auth = (function () {
    function Auth(config, storage) {
      _classCallCheck(this, _Auth);

      this.config = config.current;
      this.storage = storage;
    }

    _createClass(Auth, [{
      key: "getToken",
      value: function getToken() {
        return this.storage.get(this.config.storageKey);
      }
    }, {
      key: "setToken",
      value: function setToken(response) {
        var token = response.headers.get(this.config.authHeaderName);
        if (token) {
          LOG.debug("Setting token in local storage: " + token);
          this.storage.set(this.config.storageKey, token);
        }
      }
    }, {
      key: "removeToken",
      value: function removeToken() {
        this.storage.remove(this.config.storageKey);
      }
    }, {
      key: "isAuthenticated",
      value: function isAuthenticated() {
        var token = this.getToken();
        if (token) {
          var sections = token.split('.');

          var base64Url = sections[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var exp = JSON.parse(window.atob(base64)).exp;

          if (exp) {
            return Math.round(new Date().getTime() / 1000) <= exp;
          }

          return true;
        }
        return false;
      }
    }]);

    var _Auth = Auth;
    Auth = (0, _aureliaFramework.inject)(_authConfig.AuthConfig, _storage.Storage)(Auth) || Auth;
    return Auth;
  })();

  exports.Auth = Auth;
});