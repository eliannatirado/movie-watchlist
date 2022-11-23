//MAIN SERVER FILE - API METHODS
const express = require("express");
const app = express();

const PORT = 8080;

const dbConnection = require("./db/index.js"); //do not need full path bc Node automatically looks for file named index

const startServer = async () => {
	//MAKING SURE MODELS MATCH THE DATABASE
	await dbConnection.sync({ force: true });
	//STARTING SERVER
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}!`);
	});
};
startServer();

app.get("/", (req, res) => {
	res.send("Hello :)");
}); //just to make sure everything is running correctly
