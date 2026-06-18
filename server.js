import flash from "connect-flash";
import MongoStore from "connect-mongo";
import csrf from "csurf";
import "dotenv/config";
import ejs from "ejs";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import mongoose from "mongoose";
import route from "./routes.js";
import errorHandle from "./src/middlewares/errors.js";
import globalMiddleware from "./src/middlewares/global.js";

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    app.emit("ready!");
    console.log("Database connected!");
  })
  .catch((err) => console.error(err));

const sessionOptions = session({
  secret: process.env.SESSION_SECRET,
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
app.use(express.static("./public"));
app.engine(".html", ejs.__express);
app.set("views", "./src/views");
app.set("view engine", "html");
//session
app.use(sessionOptions);
app.use(flash());
//security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https://cdn.jsdelivr.net/"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net/"],
    },
  }),
);
app.use(csrf());
//middleware - routes
app.use(globalMiddleware);
app.use(errorHandle);
app.use(route);

app.on("ready!", () => {
  app.listen(3000, () => console.log("Server is running on port 3000"));
});
