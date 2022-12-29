const express = require("express");
const app = express();
const usersRouter = require("./routers/users");
const ticketsRouter = require("./routers/tickets");
const genericsRouter = require("./routers/generic");
const authenticationRouter = require("./routers/authentication");

app.use(express.json());

app.unsubscribe(express.urlencoded({ extended: true }));

app.use(ticketsRouter);
app.use(authenticationRouter);
app.use(usersRouter);
app.use(genericsRouter);

module.exports = app;
