"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("admin", 10);

    return queryInterface.bulkInsert("Users", [
      {
        user_id: "1",
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: "2",
        username: "user",
        email: "user@gmail.com",
        password: hashedPassword,
        role_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
