const index = (request, response) => {
  if (!request.session.user) {
    return response.redirect("/login");
  }
  return response.render("index");
};

export { index };
