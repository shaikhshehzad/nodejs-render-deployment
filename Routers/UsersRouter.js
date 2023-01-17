const Router = require("express").Router();

const UserController = require("../Controllers/UsersController");

Router.post("/signup", UserController.RegisterNewUser);

module.exports = Router;