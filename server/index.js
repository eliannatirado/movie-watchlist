const express = require("express");
const app = express();

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}!`);
});

app.get("/", (req, res) => {
	res.send("Hello :)");
}); //just to make sure everything is running correctly 
