const index = (request, response) => {
  if (!request.session.user) {
    response.redirect("/login");
    return;
  }
  response.render("index");
};

export { index };
