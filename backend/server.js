const dotenv = require('dotenv');
const app = require("./app");
const cloudinary = require('cloudinary');
const connectDatabase = require("./config/database");


// handling uncaught exeption

process.on("uncaughtException", (err) => {
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to uncaught promise rejection");
    process.exit(1);
});


// config

dotenv.config({ path: "backend/config/config.env" });

// connect to mongodb

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
});

// unhandled promise rejection

process.on("unhandledRejection", err => {
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    })
})