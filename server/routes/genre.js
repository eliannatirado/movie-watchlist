const express = require("express");
const router = express.Router();
const { Genre } = require("../db"); //require('../db') is an object so {Genre} is destructuring the object the same as require('../db').Genre

//GET respond with HTMl text to be rendered & show a form
router.get("/", (req, res) => {
	res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Add a new Genre</title>
        </head>
        <body>
            <h1>Add new Genre</h1>
            <form method="POST" action="/genre">
                <div>
                    <label>Name:</label>
                    <input type="text" name="theName" />
                    <button type="submit">Add Genre</button>
                </div>
            </form>
        </body>
    </html>
    `);
});

//POST for them to create a new genre
//using next function so that if something we do with async throws an error, I can call next function with that error
router.post("/", async (req, res, next) => {
	try {
		const newGenre = await Genre.create({ name: req.body.theName }); //the create method comes from the Model object in Sequelize. We are saying that the name is going to come from the request body name property
		console.log(newGenre);
		res.redirect("/genre"); //takes them back to the form page once the form has been submitted
	} catch (e) {
		next(e);
	}
});

//EXPORTS
module.exports = router;
