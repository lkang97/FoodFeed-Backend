"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        userId: 1,
        imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318358364",
        caption: "PASTA-bly the best dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318628713",
        caption: "Let's TACO about how yummy this is",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318763534",
        caption: "Un-PHO-getably delicious",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
