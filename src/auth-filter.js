
//used to determine whether or not something should show up on the view level
export class AuthFilterValueConverter {
  toView(routes, condition) {
    return routes.filter(r => r.config.auth === undefined || r.config.auth === condition)
  }
}
