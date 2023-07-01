const mongoose = require("mongoose");

const removeItemSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
});

const RemoveItem = mongoose.model("RemoveItem", removeItemSchema);

module.exports = RemoveItem;
