//importing database connection function from dbconnection
import { pool } from "../database/dbConnection.js"

// export const createTask = async(req, res, _next) => {
//     let sqlQuery = `UPDATE user Set
//     task1 = '${req.body.task1}',
//     task2 = '${req.body.task2}',
//     task3 = '${req.body.task3}'
//     where userid = ${req.params.id}`

//     const [user] = await pool.query(sqlQuery);

//     if(user.affectedRows <= 0){
//         res.status(404).json({
//             status: 'error',
//             message: 'Record not changed'
//         })
//     }else{
//         res.status(200).json({
//             status: 'success',
//             message: 'record updated',
//             results: user.length,
//             affectedRows: user.affectedRows
//         })
//     }
// }

export const getAllTasks = async(req, res, _next) => {

    const [tasks] = await pool.query(`select * from task`);

    res.status(200).json({
        status: 'success',
        result: tasks.length,
        data: {tasks:tasks}
    })
}

export const getOneTask = async(req, res, _next) => {
    
    const [task] = await pool.query(`select * from task where taskid = ${req.params.id}`)

    if(task.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record not found'
        })
    }else{
        res.status(200).json({
            status: 'success',
            results: task.length,
            data: {task: task[0]}
        })
    }
}

export const createTask = async(req, res, _next) => {

    let currentdate = new Date('');

    const [newtask] = await pool.query(`
        INSERT INTO task
        (taskname, description, date_added)
        values
        ('${req.body.taskname}',
        '${req.body.description}',
        '${currentdate}')
        `)

        if(newtask <= 0){
            res.status(404).json({
                status: 'error',
                message: 'record not created'
            });
        }else{
            res.status(201).json({
                status: 'success',
                message: 'record created',
                results: newtask.length,
                insertId: newtask.insertId
            })
        }
}

export const editTask = async(req, res, _next) => {
    const [task] = await pool.query(`
        UPDATE task set
        taskname = '${req.body.taskname}',
        description = '${req.body.description}'
        where taskid = '${req.params.id}'
        `)

        if(task.affectedRows <= 0){
            res.status(404).json({
                status: 'error',
                message: 'record not changed'
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'record update',
                results: task.length,
                affectedRows: task.affectedRows
            })
        }
}

export const deleteTask = async(req, res, _next) => {

    const [deletedTask] = await pool.query(`
        delete from task where taskid = ${req.params.id}
        `)

        if(deleteTask.affectedRows == 0){
            res.status(404).json({
                status: 'error',
                message: 'record could not be deleted, check if it exists'
            });
        }else{
            res.status(200).json({
                status: 'success',
                message: 'successfully deleted',
                results: deleteTask.affectedRows
            })
        }
}