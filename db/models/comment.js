"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Post, { foreignKey: "postId" });
  };
  return Comment;
};
