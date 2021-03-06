System.register([], function (_export) {
  "use strict";

  var AuthFilterValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      AuthFilterValueConverter = (function () {
        function AuthFilterValueConverter() {
          _classCallCheck(this, AuthFilterValueConverter);
        }

        _createClass(AuthFilterValueConverter, [{
          key: "toView",
          value: function toView(routes, condition) {
            return routes.filter(function (r) {
              return r.config.auth === undefined || r.config.auth === condition;
            });
          }
        }]);

        return AuthFilterValueConverter;
      })();

      _export("AuthFilterValueConverter", AuthFilterValueConverter);
    }
  };
});