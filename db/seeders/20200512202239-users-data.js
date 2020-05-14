"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "demoUser",
        email: "demo@demo.com",
        profileName: "Demo User",
        imageUrl: "placeholder",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589315427271",
        biography: "Edit this later",
        hashedPassword: bcrypt.hashSync("demouser"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "lkang",
        email: "lisa@lisa.com",
        profileName: "Lisa Kang",
        imageUrl: "placeholder",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589316021025",
        biography: "Edit this later too",
        hashedPassword: bcrypt.hashSync("lisa"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
