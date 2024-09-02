//importing database connection function from dbconnection
import { pool } from "../database/dbConnection.js"

//security imports
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

//function to create the JWT token based on inputs
function signJWTWebtoken(user){
    return JWT.sign({
        userid:user.userid,
        useremail:user.useremail,
        task1:user.task1,
        task2:user.task2,
        task3:user.task3},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }    
    )
}


//function to register user
export const registerUser = async(req, res, _next) => {

    //hashing password before it is sent to database
    req.body.password = await bcrypt.hashSync(req.body.password);

    // //sql query statement being filled with necessary data
    // const [sqlQuery] = await pool.query(`
    // INSERT INTO user
    // (email, password, task1, task2, task3) values
    // (${req.body.email},
    //  ${req.body.password},
    //  ${req.body.task1},
    //  ${req.body.task2},
    //  ${req.body.task3})`)

    const query = `insert into user (email, password) values (?,?)`

    const [sqlQuery] = await pool.query(query, 
    [req.body.email, req.body.password]);


     //executes only if the user registers successfully
     if(sqlQuery.insertId > 0){
        //inserting user data into token object
        const token = signJWTWebtoken({
            userid: sqlQuery.insertId,
            useremail: sqlQuery.email,
            task1: sqlQuery.task1,
            task2: sqlQuery.task2,
            task3: sqlQuery.task3
        });
        //error handling
        //executes if status is successful
        res.status(201).json({
            status: 'success',
            data: {
                token,
                user: req.body
            }
        });
     }else{
        //executes if status is unsuccessful
        res.status(404).json({
            status: 'success',
            message: 'Error during registration'
        })
     }
}



//function to login the user
export const loginUser = async(req, res, _next) => {

    const [user] = await pool.query(`select * from user where email = '${req.body.email}'`);

    //checking if user exists
    if(!user.length)
        return res.status(404).json({
    status: 'error',
            message: 'user not found'
    });

    //comparing password entered to stored password
    if(!(await bcrypt.compare(req.body.password, user[0].password)))
        return res.status(400).json({
    status: 'error',
    message: 'Invalid credentials'
});

//declaring user's token
const token = signJWTWebtoken(user[0]);

res.status(200).json({
    status: 'success',
    data: {
        token,
        user: user[0]
    }
})
}

//function to protect links from unauthorized access
export const protect = async(req, res, _next) => {

    const authorization = req.get('Authorization');

    console.log(`REQUEST AUTHORIZATION  ${authorization}`);

    if(!authorization?.startsWith('Bearer'))
        return _next(
            res.status(400).json({
                status: 'error',
                message: 'You need to be logged to access this feature...'
            })
        );
    const token = authorization.split(' ')[1];
    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(`DECODED TOKEN: ${JSON.stringify(decoded)}`);

        const [user] = await conn.query(`SELECT * from user where userid = ?`, [decoded.userid]);
        if(!user.length)
            return next(
        res.status(404).json({
            status: 'error',
            message: 'This token is no longer valid or there is an error'
        })
    );

    
    next();
    }catch(error){
            if(error.message == 'jwt expired')
                return _next(
                    res.status(400).json({
                        status: 'error',
                        message: 'Token expired'
                    })
                );
                _next();
    }
};

//function to get a user's data
export const  getThisUser = async(req, res, _next) => {
    const data = req.user;
    
    if(!data)
        return _next();
    // data.password = undefined;
    const sqlQuery = `select * from user where userid = ?`;
    const [user] = await pool.query(sqlQuery, [data.userid]) //executes sql statement as function to retrieve user data

    //error handling
    if(!user.length)
        //executes if user does not exist
        return res.status(404).json({
            status: 'error',
            message: 'Invalid request'
        })
        //executes if user is found
        user[0].password = undefined;
        res.status(200).json({
            status: 'success',
            data: {
                user: user[0]
            }
        })

}
