// models/User.js
const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 30],
      isAllowed(value) {
        const allowedRegex = /^[a-zA-Z0-9_]+$/;
        if (!allowedRegex.test(value)) {
          throw new Error('O nome de usuário deve conter apenas letras, números e underscores.');
        }
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 80],
      isAllowed(value) {
        const allowedRegex = /^[a-zA-Z0-9_]+$/;
        if (!allowedRegex.test(value)) {
          throw new Error('A senha deve conter apenas letras, números ou underscores.');
        }
      },
    },
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    },
  },
});

module.exports = User;
=======

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;
>>>>>>> 3c4d9349e6fd48865ebc82936d3bb70ac054883f
