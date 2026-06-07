const middlewareGlobal = (request, response, next) => {
  response.locals.localVariable = "Variável local";
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
