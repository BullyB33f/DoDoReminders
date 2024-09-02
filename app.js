//These imports are the necessary packages needed to run the backend
import express from "express";
import morgan from "morgan";
import mysql from "mysql2";
import cors from "cors";
import { authRouter, taskRouter } from "./router/router.js";

//using the imported express as a variable
const app = express();

app.options('*', cors(['http://localhost:4200', 'http://localhost:46500']));
app.use(cors(['http://localhost:4200','http://localhost:46500']));

//setting the json payload limit
app.use(express.json({limit: '100kb'}));
app.use(express.urlencoded({extended: true,  limit: '100kb'}))

//declaring port number
const port = 8765;

//checking if node_env value is not equal to production; thus telling the 
//program to use morgan
if(process.env.NODE_ENV !== 'production') app.use(morgan('dev'));



//api midpoints
//mid point for authentication 
app.use('/api/v1/auth', authRouter);
//mid point for to do list
app.use('/api/v1/todo', taskRouter);

const server = app.listen(port, () => console.log(`listening on port:${port}`))