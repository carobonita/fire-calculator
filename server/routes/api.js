const express = require('express');
const userController = require('../controllers/fireControllers.js');
const User = require('../models/User');

const router = express.Router();

router.post(
  '/api/load_user',
  userController.loadOrCreateUser,
  async (req, res) => {
    try {
      res.status(200).json(res.locals.username);
    } catch (err) {
      res.status(500).json({ err: 'Error in routes/api/load_user' });
    }
  }
);

router.post('/api/update_user', userController.updateUser, async (req, res) => {
  try {
    res.status(200).json(res.locals.updatedUser);
  } catch (err) {
    res.status(500).json({ err: 'Error in routes/api/update_user' });
  }
});

router.delete(
  '/api/delete_user/:username',
  userController.deleteUser,
  async (req, res) => {
    const { deletedUser } = res.locals;
    try {
      res.status(200).json({ message: `Deleted user ${deletedUser.username}` });
    } catch (err) {
      res.status(500).json({ err: 'user could not be deleted' });
    }
  }
);

router.get(
  '/api/calculate_target',
  userController.calculateTarget,
  async (req, res) => {
    try {
      res.status(200).json(res.locals.expenses);
    } catch (err) {
      res.status(500).json({ err: 'Error in routes/api/calculate_target' });
    }
  }
);

module.exports = router;
