const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/minichat");
}

//Index route
app.get("/chats",async (req, res) => {
	   let chats = await Chat.find();
	   console.log(chats);
	   res.render("index.ejs", {chats});
});

//New route
app.get("/chats/new", (req,res) => {
		res.render("new.ejs");
});

//Create route
app.post("/chats", (req,res) =>{
	  let {from, to, msg} = req.body;
	  let newChat = new Chat({
		  from:from,
		  to:to,
		  msg:msg,
		  created_at: new Date()
	  });
	  newChat.save().then(res =>  {
		  console.log("chat saved");
	  }).
	  catch(err => {
			console.log(err);
	  });
	  res.redirect("/chats");
});

let chat1 = new Chat({
  from: "neha",
  to: "priya",
  msg: "send me you exam sheets",
  created_at: new Date(),
});

chat1.save().then((res) => {
  console.log(res);
});

app.get("/", (req, res) => {
  res.send("Working route");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
