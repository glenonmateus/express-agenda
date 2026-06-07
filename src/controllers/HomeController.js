const home = (request, response) => {
  response.render("index", {
    title: "Este será o titulo da aplicação",
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  });
  return;
};

const submit = (request, response) => {
  response.send("<p>Recebido com sucesso</p>");
  return;
};

export { submit, home };
