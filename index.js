import app from "./server.js"
import express from 'express';
import cors from "cors";
import mongodb from "mongodb";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import reviewsDAO from "./dao/reviewsDAO.js"


const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USER']
const mongo_password = process.env['MONGO_PASS']
const mongo_uri = `mongodb+srv://${mongo_username}:${mongo_password}@db.vgqoo.mongodb.net/?retryWrites=true&w=majority&appName=Db`
const port = 8000;

MongoClient.connect(
    mongo_uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500
}).catch(err => {
    console.error(err.stack)
    process.exit(1)
})

    .then(async client => {
        await reviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })