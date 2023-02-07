const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./routers/users");
const ticketsRouter = require("./routers/tickets");
const genericsRouter = require("./routers/generic");
const authenticationRouter = require("./routers/authentication");

const basePath = "/smarTicket";

app.use(express.json({ limit: "50mb" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.unsubscribe(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(basePath, ticketsRouter);
app.use(basePath, authenticationRouter);
app.use(basePath, usersRouter);
app.use(basePath, genericsRouter);

module.exports = app;
