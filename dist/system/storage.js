System.register(["aurelia-framework", "./auth-config"], function (_export) {
  "use strict";

  var inject, LogManager, AuthConfig, LOG, Storage;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_authConfig) {
      AuthConfig = _authConfig.AuthConfig;
    }],
    execute: function () {
      LOG = LogManager.getLogger("aurelia-security");

      Storage = (function () {
        function Storage(config) {
          _classCallCheck(this, _Storage);

          this.config = config.current;
        }

        _createClass(Storage, [{
          key: "get",
          value: function get(key) {
            if ('localStorage' in window && window['localStorage'] !== null) {
              return localStorage.getItem(key);
            } else {
              LOG.warn('Warning: Local Storage is disabled or unavailable');
              return undefined;
            }
          }
        }, {
          key: "set",
          value: function set(key, value) {
            if ('localStorage' in window && window['localStorage'] !== null) {
              return localStorage.setItem(key, value);
            } else {
              LOG.warn('Warning: Local Storage is disabled or unavailable');
              return undefined;
            }
          }
        }, {
          key: "remove",
          value: function remove(key) {
            if ('localStorage' in window && window['localStorage'] !== null) {
              return localStorage.removeItem(key);
            } else {
              LOG.warn('Warning: Local Storage is disabled or unavailable');
              return undefined;
            }
          }
        }]);

        var _Storage = Storage;
        Storage = inject(AuthConfig)(Storage) || Storage;
        return Storage;
      })();

      _export("Storage", Storage);
    }
  };
});