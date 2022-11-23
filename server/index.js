//MAIN SERVER FILE - API METHODS
const express = require("express");
const app = express();
const genresRouter = require('./routes/genre');

const PORT = 8080;

const { dbConnection } = require("./db"); //do not need full path bc Node automatically looks for file named index

const startServer = async () => {
	//MAKING SURE MODELS MATCH THE DATABASE
	await dbConnection.sync();
	//STARTING SERVER
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}!`);
	});
};
startServer();

//MIDDLEWARE
app.use(express.json()); //for json requests
app.use(express.urlencoded({ extended: false })); //TODO: no idea what this does? makes req.body available?
app.use('/genre', genresRouter); //any request method to /genre will go into genresRouter (genre.js)

app.get("/", (req, res) => {
	res.send("Hello :)");
}); //just to make sure everything is running correctly
