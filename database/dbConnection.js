//importing packages for use
import mysql from "mysql2";
import dotenv from "dotenv";

//connecting config file to dbConnection file
dotenv.config({ path: './config.env'});

//creating a pool connection to the database using info from the config.env file
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}).promise();