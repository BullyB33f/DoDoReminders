import express from 'express';
import { getThisUser, loginUser, protect, registerUser } from '../controllers/userController.js';
import { createTask, deleteTask, editTask, getAllTasks, getOneTask } from '../controllers/taskController.js';

export const authRouter = express.Router();
export const taskRouter = express.Router();

taskRouter.get('/alltasks', getAllTasks)//API ENDPOINT TO GET ALL TASK FROM DATABASE
taskRouter.get('/onetask/:id', getOneTask)//API ENDPOINT TO GET ONE TASK FROM DATABASE
taskRouter.post('/createtask', createTask)//API ENDPOINT TO CREATE A TASK
taskRouter.patch('/edittask/:id', editTask)//API ENDPOINT TO GET ONE TASK
taskRouter.delete('/deletetask/:id', deleteTask)//API ENDPOINT TO DELETE ONE TASK



//route to register user
authRouter.post('/register', registerUser);
//route to login user
authRouter.post('/login', loginUser);



authRouter.use(protect);
//route to access user profile
authRouter.get('/profile', getThisUser);