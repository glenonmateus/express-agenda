const errorHandle = (error, request, response, next) => {
  if (error) response.render("404");
  next();
};

export default errorHandle;
