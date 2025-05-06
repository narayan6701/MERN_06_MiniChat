const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/minichat");
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

let allChats = [
	{
		from: "neha",
		to: "preeti",
		msg: "send me notes for the exam",
		created_at: new Date()
	},
	{
		from: "rohit",
		to: "mohit",
		msg: "kal oops ka exam h or m development pdh raha hu",
		created_at: new Date()
	},
	{
		from: "amit",
		to: "sumit",
		msg: "all the best",
		created_at: new Date()
	},
	{
		from:"tony",
		to:"peter",
		msg:"Love you 3000",
		created_at: new Date()
	}		
];   

Chat.insertMany(allChats);