const pool = require('./config/db.js');
const express = require("express");
const app = express();
const usersRouter = require('./routes/users.routes.js');
const clientsRouter = require('./routes/clients.routes.js');

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/clients', clientsRouter);



async function startServer() {
    try {
        await pool.query('SELECT 1');



        app.listen(3000);
        console.log("LISTENING ON PORT 3000");
        console.log("CONNECTED TO POSTGRE");

    }
    catch (error) {
        console.log(error);
        console.log("FAILED TO CONECT TO POSTGRE");
    }

}

startServer();

