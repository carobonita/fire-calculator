const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const userController = {};

userController.loadOrCreateUser = (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    // TODO: move res call to api.js
    return res.status(400).json({ err: 'No username provided' });
  } else {
    // Query the database using Mongoose
    User.findOne({ username }, (err, user) => {
      if (err) {
        // TODO: move res call to api.js
        return res.status(500).json({ err: 'Error querying the database' });
      }
      if (user) {
        // TODO: move res call to api.js
        res.status(200).json(user);
        return next();
      }
      console.log('User does not exist');
      User.create({ username }).then((newUser) => {
        console.log(`Created new user: ${newUser}`);
        // TODO: move res call to api.js
        res.status(200).json(newUser);
        return next();
      });
    });
  }
};

userController.updateUser = (req, res, next) => {
  const { username, amount, amount_frequency, expenses, rate, savings } =
    req.body;
  User.findOneAndUpdate(
    { username },
    { amount, amount_frequency, expenses, rate, savings },
    { new: true },
    (err, user) => {
      if (err) {
        // TODO: move res call to api.js
        return res.status(500).json({ err: 'Error querying the database' });
      } else {
        // TODO: move res call to api.js
        res.status(200).json(user);
        return next();
      }
    }
  );
};

userController.deleteUser = (req, res, next) => {
  const { username } = req.params;
  if (!username) return next();

  User.findOneAndDelete({ username }).then((user) => {
    if (user) {
      res.locals.deletedUser = user;
    }
    return next();
  });
};

userController.calculateTarget = (req, res, next) => {
  let { expenses } = req.query;
  if (!expenses) {
    expenses = 0;
  } else {
    expenses = parseInt(expenses) * 25;
  }
  res.locals.expenses = expenses;
  return next();
};

module.exports = userController;
