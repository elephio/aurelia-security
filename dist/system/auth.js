System.register(["aurelia-framework", "./storage", "./auth-config"], function (_export) {
  "use strict";

  var inject, LogManager, Storage, AuthConfig, LOG, Auth;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_storage) {
      Storage = _storage.Storage;
    }, function (_authConfig) {
      AuthConfig = _authConfig.AuthConfig;
    }],
    execute: function () {
      LOG = LogManager.getLogger("aurelia-security");

      Auth = (function () {
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
        Auth = inject(AuthConfig, Storage)(Auth) || Auth;
        return Auth;
      })();

      _export("Auth", Auth);
    }
  };
});