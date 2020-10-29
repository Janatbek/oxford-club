const express = require('express');
const mongoose = require('mongoose');
const routes = require("./router");
const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:8100',
    optionsSuccessStatus: 200
  }
// schemas
mongoose
    .connect("mongodb://localhost:27017/stockalerter", 
    { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => {
        const app = express();
        app.use(cors(corsOptions));
        app.use("/api", routes);
		app.listen(8000, () => {
			console.log("Server has started!")
		})
	})