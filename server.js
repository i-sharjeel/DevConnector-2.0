const express = require("express");
const connectDB = require("./config/db");
require('dotenv').config();
const path = require("path");
const app = express();
let domainName = "";

if (process.env.STATUS === "production") {
    domainName = "https://dev-connector-2-0.vercel.app"
}

//Connect Database
connectDB();

// init Middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("API Running"));

// Defining Routes

app.use(`${domainName}/api/users`, require("./routes/api/users"));
app.use(`${domainName}/api/auth`, require("./routes/api/auth"));
app.use(`${domainName}/api/profile`, require("./routes/api/profile"));
app.use(`${domainName}/api/posts`, require("./routes/api/posts"));

// Serve static assets in production

// console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
console.log('domainName: ' + domainName);

if (process.env.STATUS == "production") {
    // set static folder
    app.use(express.static('client/build'));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

else {
    console.log("I am running and env is Development")
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

module.exports = app;