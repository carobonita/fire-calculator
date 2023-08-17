const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUserSchema = new Schema({
  amount: {
    type: Number,
    default: 500,
  },
  amount_frequency: {
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly',
  },
  expenses: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    default: 0.07,
  },
  savings: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', newUserSchema);
