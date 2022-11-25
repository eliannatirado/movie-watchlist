const express = require("express");
const router = express.Router();
const { Movie, Genre } = require("../db"); //require('../db') is an object so {Genre} is destructuring the object the same as require('../db').Genre

//GET /movies shows a movie list
router.get("/", (req, res) => {
	res.send("movie list will go here");
});

//GET /movies/add-movie
//respond with HTMl text to be rendered & show a form to add movie
router.get("/add-movie", async (req, res) => {
	const allOfMyGenres = await Genre.findAll();
	res.send(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Add a move to your watchlist</title>
        </head>
        <body>
            <h1>Add Movie</h1>
            <form method="POST" action="/movies">
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" />
                </div>
                <div>
                    <label>IMDB Link:</label>
                    <input type="text" name="link" placeholder="Optional" />
                </div>
                <div>
                <div id="genre-selects-container">
                    <select id="genre-select" name="genres">
                        <option></option>
                        ${allOfMyGenres
													.map((genre) => {
														return `<option value="${genre.id}">${genre.name}</option>`;
													})
													.join("")}
                    </select>
                    </div>
                    <button type="button" id="add-button">+</button>
                </div>
                <button type="submit">Add Movie</button>
            </form>
            <script type="text/javascript" src="/movie-form.js"></script>
        </body>
    </html>`);
});

//POST /movies
//using next function so that if something we do with async throws an error, I can call next function with that error
router.post("/", async (req, res, next) => {
	const title = req.body.title;
	const imdbLink = req.body.link;
	const attachedGenreIds = req.body.genres;

	console.log("BODY RETURNS THIS:", req.body);

	try {
		const newMovie = await Movie.create({
			title: title,
			imdbLink: imdbLink || null,
		});
		await newMovie.setGenres(attachedGenreIds);
		res.redirect("/movies");
	} catch (e) {
		next(e);
	}
});

//EXPORTS
module.exports = router;
