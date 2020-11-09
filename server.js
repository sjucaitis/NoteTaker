// Initialize server 

const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const fs = require("fs");
const path = require("path");
var http = require("http");

// initialize and create port

const app = express();
const PORT = process.env.PORT || 3000;

// body parsing, static, and route middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use("/.api", apiRoutes);
app.use("/", htmlRoutes);

// listener

app.listen(PORT, () => console.log("Listening on Port: ${PORT}"));