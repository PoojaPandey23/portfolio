// Importing required modules

const express = require("express"); // express.js framework, used for building web applications and APIs in Node.js
const cors = require("cors"); // middleware allows cross-origin resource sharing, enables secure communication between different origins
const mongoose = require("mongoose"); // Is an Object-data modeling library for MongoDB and Node.js, providing a higher-level abstraction for interacting with MongpDB

//Creating express app and setting up port

const app = express(); // creates an instance of the Express application
const PORT = process.env.PORT || 5000; // defines the port on which the server will listen. defaults to port 5000 but can be overridden by an environment variable

//Middleware setup

app.use(cors()); // middleware, allows CORS requests
app.use(express.json()); // middleware, parses incoming JSON payloads, making them available on 'req.body'

//Connecting to MongoDB

mongoose.connect("mongodb://localhost:27017/portfolio", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // connects to mongodb database named 'portfolio' running on 'localhost' at port '27017'. The options are for avoiding deprecation warnings.

//Defining MongoDB Schema and Model

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  link: String,
}); // This defines a schema for a project in MongoDB. Each project has a title, description, an arrayt of technologies, and a link.

const Project = mongoose.model("Project", projectSchema); // creates a Mongoose model named 'Project' based on the defined schema.

//Handling GET and POST Requests

app.get("/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
}); // this route handles GET requests to '/projects' and returns all projects from the database as JSON

app.post("/projects", async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
}); // this route handles POST requests to '/projects' and creates a new project based on the request body sent by the client. It then saves the new project to the database and returns it as JSON.

// Starting the Express Server

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
}); // starts the express server and listens on the specified port. When the server starts, it logs a message to the console indicating the port number.
