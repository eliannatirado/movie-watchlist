//POSTGRES SERVER - BACKEND
const Sequelize = require("sequelize");

//using Sequelize to connect to the database
const dbConnection = new Sequelize("postgres://localhost:5432/moviewatchlist");

// //TESTING DATABASE CONNECTION
// const test = async () => {
// 	try {
// 		await dbConnection.authenticate;
// 		console.log("authentication worked");
// 	} catch (e) {
// 		console.error(e);
// 	}
// };
// test();

//MODELS (tables) FOR DATABASE
const Movie = dbConnection.define("movie", {
	//COLUMNS
	title: {
		type: Sequelize.STRING(255),
		allowNull: false,
		validate: {
			notEmpty: true, //making sure you can't add empty string (diff than null)
		},
	},
	imdbLink: {
		type: Sequelize.STRING(1000),
		allowNull: true, //true is the default
		validate: {
			isUrl: true,
		},
	},
	watched: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

const Genre = dbConnection.define("genre", {
	name: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
});

//ASSOCIATIONS
Movie.belongsToMany(Genre, { through: "movies_genres" });
Genre.belongsToMany(Movie, { through: "movies_genres" });

//EXPORT THE CONNECTION & MODELS
module.exports = {
	dbConnection: dbConnection,
	Movie: Movie,
	Genre: Genre,
};
