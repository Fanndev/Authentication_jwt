require("dotenv").config();
const authController = require("../../controller/auth.controller");

module.exports = (express, app, default_router) => {
  const router = express.Router();

  //   router.post("/auth/google/validate", authController.googleValidate); // user login
  router.post("/auth/register", authController.register); // user register
  router.post("/auth/login", authController.login); // user login

  app.use(default_router, router);
};
