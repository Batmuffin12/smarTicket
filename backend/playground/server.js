const express = require("express");
const app = express();
const usersRouter = require("./routers/users");
const ticketsRouter = require("./routers/tickets");
const trainsRouter = require("./routers/trains");

app.use(express.json());

app.unsubscribe(express.urlencoded({ extended: true }));

app.use(ticketsRouter);
app.use(usersRouter);
app.use(trainsRouter);

module.exports = app;
