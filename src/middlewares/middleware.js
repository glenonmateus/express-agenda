const middlewareGlobal = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  response.locals.errors = request.flash("errors");
  response.locals.success = request.flash("success");
  response.locals.user = request.session.user;
  next();
};

const checkCsrfError = (error, request, response, next) => {
  if (error) response.render("404");
  next();
};

export { middlewareGlobal, checkCsrfError, csrfMiddleware };
