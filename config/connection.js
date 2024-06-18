import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const Connection = () => {
    const MONGODB_URI = process.env.MONGODB_URI

    mongoose.set('strictQuery', false);
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully");
    })
    mongoose.connection.on('disconnected', () => {
        console.log("Database Disconnected");
    })

    mongoose.connection.on('error', () => {
        console.log('Error connecting the database');
    })
}

export default Connection;