const middlewareGlobal = (request, response, next) => {
  response.locals.errors = request.flash("errors");
  response.locals.success = request.flash("success");
  response.locals.user = request.session.user;
  next();
};

const checkCsrfError = (error, request, response, next) => {
  if (error) response.render("404");
  next();
};

const csrfMiddleware = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  next();
};

export { middlewareGlobal, checkCsrfError, csrfMiddleware };
