System.register(["aurelia-framework", "./auth", "./auth-config", "aurelia-router"], function (_export) {
  "use strict";

  var inject, LogManager, Auth, AuthConfig, Redirect, Router, LOG, AuthStep;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      LogManager = _aureliaFramework.LogManager;
    }, function (_auth) {
      Auth = _auth.Auth;
    }, function (_authConfig) {
      AuthConfig = _authConfig.AuthConfig;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
      Router = _aureliaRouter.Router;
    }],
    execute: function () {
      LOG = LogManager.getLogger('aurelia-security');

      AuthStep = (function () {
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
              if (!this.auth.isAuthenticated()) {
                LOG.debug("This route requires authentication. Redirecting to loginRedirect.");
                return next.cancel(new Redirect(this.config.loginUrl));
              } else if (this.auth.isAuthenticated() && routingContext.getAllInstructions().some(function (i) {
                return i.fragment;
              }) == this.config.loginUrl) {
                var loginRedirect = this.auth.getLoginRedirect();
                return next.cancel(new Redirect(this.config.loginRedirect));
              }
            }

            return next();
          }
        }]);

        var _AuthStep = AuthStep;
        AuthStep = inject(AuthConfig, Auth, Router, Redirect)(AuthStep) || AuthStep;
        return AuthStep;
      })();

      _export("AuthStep", AuthStep);
    }
  };
});