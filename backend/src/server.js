const pool = require('./config/db.js');
const cors = require('cors');
const express = require("express");
const app = express();
const usersRouter = require('./routes/users.routes.js');
const clientsRouter = require('./routes/clients.routes.js');
const auditTemplatesRouter = require('./routes/audit.templates.routes.js');
const templateTaskRouter = require('./routes/template.tasks.routes.js')
const auditsRouter = require('./routes/audits.routes.js');
const tasksRouter = require('./routes/tasks.routes.js');
const authRouter = require('./routes/auth.routes.js');
const activityLoggerRouter = require('./routes/activity.logger.routes.js');

app.use(cors());
app.use(express.json());


app.use('/api/users', usersRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/audit-templates', auditTemplatesRouter);
app.use('/api/template-tasks', templateTaskRouter);
app.use('/api/audits', auditsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);
app.use('/api/activity-logs', activityLoggerRouter);



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

