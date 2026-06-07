const middlewareGlobal = (request, response, next) => {
  response.locals.localVariable = "Variável local";
  next();
};

const checkCsrfError = (error, request, response, next) => {
  if (error && error.code !== "EBADCSRFTOKEN") return next(error);
  response.status(403).send("Invalid CSRF token");
};

const csrfMiddleware = (request, response, next) => {
  response.locals.csrfToken = request.csrfToken();
  next();
};

export { middlewareGlobal, checkCsrfError, csrfMiddleware };
