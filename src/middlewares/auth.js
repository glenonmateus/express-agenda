const authMiddleware = (request, response, next) => {
  if (!request.session.user) {
    request.flash("errors", "Por favor, realize o login");
    return response.redirect("/login");
  }
  next();
};

export default authMiddleware;
