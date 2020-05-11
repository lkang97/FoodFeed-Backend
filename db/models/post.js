"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      caption: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Comment, { foreignKey: "postId" });
    Post.hasMany(models.Like, { foreignKey: "postId" });
  };
  return Post;
};
