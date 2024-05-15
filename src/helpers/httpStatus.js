const StatusCode = {
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  OK: 200,
  CREATED: 201,
};

const ResponseMessage = {
  FailRegistered: "Failed register data",
  UserNotFound: "User not found",
  EmailAlreadyExist: "Email already registered",
  Success: "Successfully",
  SuksesRegistered: "Successfully register.",
  LoginSuccess: "You have successfully logged in.",
  LoginFailed: "Invalid credentials.",
  NotFound: "Data not found",
  Unauthorized: "Unauthorized",
  Notrequired: "Email and Password not found",
  Emailnot: "Email not found",
  Wrongpass: "Wrong password",
};

module.exports = {
  StatusCode,
  ResponseMessage,
};
