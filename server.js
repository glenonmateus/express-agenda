import "dotenv/config";
import ejs from "ejs";
import express from "express";
import mongoose from "mongoose";
import route from "./routes.js";
import {
  csrfMiddleware,
  checkCsrfError,
  middlewareGlobal,
} from "./src/middlewares/middleware.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import helmet from "helmet";
import csrf from "csurf";

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    app.emit("ready!");
    console.log("Database connected!");
  })
  .catch((err) => console.error(err));

const sessionOptions = session({
  secret: "asçldfajsçldfkjasçlkdfjaçlskjfçlaksjdfçlak",
  store: MongoStore.create({ client: mongoose.connection.getClient() }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: process.env.SESSION_MAX_AGE_IN_SECONDS,
    httpOnly: true,
  },
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.engine(".html", ejs.__express);
app.set("views", "./src/views");
app.set("view engine", "html");
//session
app.use(sessionOptions);
app.use(flash());
//security
app.use(helmet());
app.use(csrf());
//middleware - routes
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(route);

app.on("ready!", () => {
  app.listen(3000, () => console.log("Server is running on port 3000"));
});
