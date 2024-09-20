// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const  colors = require('colors');
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";


//config env
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to mongodb database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in mongodb ${error}`.bgMagenta.bgCyan)
    }
};


// Load environment variables from the .env file


const app = express();

//database config
connectDB();

// Middleware to parse JSON
app.use(express.json());
  app.use(morgan('dev'));

//routes
 app.get("/api/v1/auth",authRoutes);

app.use('/api/v1/auth',authRoutes);


// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Connected to MongoDB');
// })
// .catch((error) => {
//     console.error('MongoDB connection error:', error);
// });

// REST API
app.get("/", (req, res) => {
    res.send("Welcome to my eCommerce app");
});

// Start the server
const PORT =  5001;

try {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`);
    });
    
} catch (error) {
    console.error('server failed to start:',error);
}


