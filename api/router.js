
const express = require("express");
const Stocks = require("./schemas/Stocks");
const request = require('request');
const router = express.Router();

// All stocks
router.get("/stocks", async (req, res) => {
	const stocks = await Stocks.find();
	res.send(stocks);
});

// search stocks by name or symbol. 
router.get("/stocks/:symbol", async (req, res) => {
	const query = req.params.symbol;
	request(`https://api.tdameritrade.com/v1/instruments?apikey=EJIIQWUPLKAMQIAJNN0QIBNAFIGPHRAN&symbol=${query}&projection=symbol-search`, { json: true }, (err, response, body) => {
		if (err) { return console.log(err); }
		res.send(body)
	});
});

// get stock info by symbol
router.get("/stock/:symbol", async (req, res) => {
	const query = req.params.symbol.toLowerCase();
	const stock = request(`https://api.tdameritrade.com/v1/instruments?apikey=EJIIQWUPLKAMQIAJNN0QIBNAFIGPHRAN&symbol=${query}&projection=fundamental`, { json: true }, (err, response, body) => {
		if (err) { return console.log(err); }
		
		res.send(body)
	});
});

module.exports = router