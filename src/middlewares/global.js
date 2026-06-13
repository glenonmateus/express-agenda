const globalMiddleware = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  response.locals.errors = request.flash("errors");
  response.locals.success = request.flash("success");
  response.locals.user = request.session.user;
  next();
};

export default globalMiddleware;
