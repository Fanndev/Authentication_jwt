const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { StatusCode, ResponseMessage } = require("../helpers/httpStatus");
const { compareSync } = require("bcrypt");
const { where } = require("sequelize");

// user auth Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.Notrequired,
    });
  }

  const user = await Users.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.Emailnot,
    });
  } else if (user.isActive === false) {
    return res.status(StatusCode.Unprocessable_Entity).json({
      message:
        "Email sudah terdaftar dan status akun telah nonaktif, silahkan menggunakan email yang lain",
    });
  }

  // check password
  const isPasswordCorrect = compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: ResponseMessage.Wrongpass,
    });
  }

  // jwt
  const token = jwt.sign({ id: user.user_id }, "Library", {
    expiresIn: "1d",
  });

  return res.status(StatusCode.OK).json({
    message: ResponseMessage.LoginSuccess,
    token,
  });
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate user input
  if (!username || !email || !password) {
    return res.status(StatusCode.BAD_REQUEST).json({
      message: "Username, email, dan password dibutuhkan",
    });
  }

  try {
    // Check if email has been used
    const isEmailUsed = await Users.findOne({
      where: { email: email },
    });

    if (isEmailUsed) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Email sudah digunakan",
      });
    }

    // Create new user
    const newUser = await Users.create({
      username: username,
      email: email,
      password: password,
    });

    // Send response with user information
    return res.status(StatusCode.OK).json({
      message: ResponseMessage.SuksesRegistered,
      data: newUser,
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: ResponseMessage.FailRegistered,
      error: error.message,
    });
  }
};
