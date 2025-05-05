const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

app.use("views", path.join(__dirname, "views"));
app.use("view engine", "ejs");

main().then(()=> {
    console.log("Connected to MongoDB");        
}).catch(err => {
    console.log("Error connecting to MongoDB", err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/minichat');
}

app.get("/", (req, res) => {
    res.send("Working route");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})