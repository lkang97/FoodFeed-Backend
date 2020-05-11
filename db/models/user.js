"use strict";
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING(30),
        unique: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      profileName: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      biography: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      hashedPassword: {
        allowNull: false,
        type: DataTypes.STRING.BINARY,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Post, { foreignKey: "userId" });
    User.hasMany(models.Comment, { foreignKey: "userId" });
    User.hasMany(models.Like, { foreignKey: "userId" });
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
