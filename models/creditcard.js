const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  cardNumber: {
    type: String,
    required: true,
  },
  cardHolder: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CreditCard", creditCardSchema);
