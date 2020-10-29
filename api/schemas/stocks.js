const mongoose = require('mongoose')
const { Schema } = mongoose;

const stocksSchema = new Schema({
  currency:  String,
  description: String,
  displaySymbol:   String,
  symbol: String,
  type: String
});
module.exports = Stocks = mongoose.model('Stocks', stocksSchema);
