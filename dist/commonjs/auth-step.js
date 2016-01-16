"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _aureliaFramework = require("aurelia-framework");

var _auth = require("./auth");

var _authConfig = require("./auth-config");

var _aureliaRouter = require('aurelia-router');

var LOG = _aureliaFramework.LogManager.getLogger('aurelia-security');

var AuthStep = (function () {
  function AuthStep(config, auth) {
    _classCallCheck(this, _AuthStep);

    this.config = config;
    this.auth = auth;
  }

  _createClass(AuthStep, [{
    key: "run",
    value: function run(routingContext, next) {
      LOG.debug("Running AuthStep...");
      if (routingContext.getAllInstructions().some(function (i) {
        return i.config.auth;
      })) {
        if (!this.auth.isAuthenticated) {
          LOG.debug("This route requires authentication. Redirecting to loginRedirect.");
          return next.cancel(new _aureliaRouter.Redirect(this.config.loginUrl));
        } else if (this.auth.isAuthenticated && routingContext.getAllInstructions().some(function (i) {
          return i.fragment;
        }) == this.config.loginUrl) {
          var loginRedirect = this.auth.getLoginRedirect();
          return next.cancel(new _aureliaRouter.Redirect(this.config.loginRedirect));
        }
      }

      return next();
    }
  }]);

  var _AuthStep = AuthStep;
  AuthStep = (0, _aureliaFramework.inject)(_authConfig.AuthConfig, _auth.Auth, _aureliaRouter.Router, _aureliaRouter.Redirect)(AuthStep) || AuthStep;
  return AuthStep;
})();

exports.AuthStep = AuthStep;