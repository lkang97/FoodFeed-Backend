"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
        userId: 1,
        imageUrl:
          "https://embed.widencdn.net/img/mccormick/xylt4a1x9r/1365x1365px/Supreme%20Pasta%20Salad_2019-04-10_8701_TSUCALAS.jpg?crop=true&anchor=255,0&q=80&color=ffffffff&u=o2hyef",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318358364",
        caption: "PASTA-bly the best dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        imageUrl:
          "https://media2.s-nbcnews.com/j/newscms/2019_26/2909406/190625-mexican-street-tacos-se-1141a_f594771d846c6bea96353fc017a2d760.fit-760w.jpg",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318628713",
        caption: "Let's TACO about how yummy this is",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        imageUrl: "https://pinchofyum.com/wp-content/uploads/Turkey-Pho-1.jpg",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318763534",
        caption: "Un-PHO-getably delicious",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        imageUrl:
          "https://embed.widencdn.net/img/mccormick/xylt4a1x9r/1365x1365px/Supreme%20Pasta%20Salad_2019-04-10_8701_TSUCALAS.jpg?crop=true&anchor=255,0&q=80&color=ffffffff&u=o2hyef",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318358364",
        caption: "PASTA-bly the best dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        imageUrl:
          "https://embed.widencdn.net/img/mccormick/xylt4a1x9r/1365x1365px/Supreme%20Pasta%20Salad_2019-04-10_8701_TSUCALAS.jpg?crop=true&anchor=255,0&q=80&color=ffffffff&u=o2hyef",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318358364",
        caption: "PASTA-bly the best dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        imageUrl:
          "https://embed.widencdn.net/img/mccormick/xylt4a1x9r/1365x1365px/Supreme%20Pasta%20Salad_2019-04-10_8701_TSUCALAS.jpg?crop=true&anchor=255,0&q=80&color=ffffffff&u=o2hyef",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318358364",
        caption: "PASTA-bly the best dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        imageUrl:
          "https://embed.widencdn.net/img/mccormick/xylt4a1x9r/1365x1365px/Supreme%20Pasta%20Salad_2019-04-10_8701_TSUCALAS.jpg?crop=true&anchor=255,0&q=80&color=ffffffff&u=o2hyef",
        // imageUrl: "https://foodfeed.s3.us-east-2.amazonaws.com/1589318358364",
        caption: "PASTA-bly the best dish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
