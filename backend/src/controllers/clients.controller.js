const pool = require('../config/db');
const { createActivityLog } = require('../utils/activityLogger');
const { buildChanges } = require('../utils/buildChanges');

//Get All Clients

const getClients = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM clients`);
        res.json(result.rows);
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Fetch Clients');
    }
}


//Get Client by id

const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM clients WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Could not find the Client');
        }
        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send('Failed To Fetch Client');
    }
}


//Create Client

const createClient = async (req, res) => {
    try {
        let { company_name,
            email,
            location,
            phone_number,
            industry } = req.body;
        let result = await pool.query(`INSERT
                                         INTO clients(company_name,
                                         email,
                                         location,
                                         phone_number,
                                         industry)
                                        values ($1,$2,$3,$4,$5)
                                        RETURNING *`,
            [company_name, email, location, phone_number, industry]
        );

        const client = result.rows[0];
        await createActivityLog(
            {
                entityId: client.id,
                entityType: 'Client',
                changedBy: req.user.id,
                action: 'Created',
                newValue: client
            }
        );

        res.json(client);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Create Client");
    }
}

//Update Client

const updateClient = async (req, res) => {
    try {
        const { company_name,
            email,
            phone_number,
            location,
            industry } = req.body;

        const { id } = req.params;

        const oldRecord = await pool.query(`
            SELECT *
            FROM clients
            WHERE id =$1`, [id]);

        const result = await pool.query(`
                UPDATE clients
                SET 
                company_name = COALESCE($1, company_name),
                email = COALESCE($2, email),
                phone_number = COALESCE($3, phone_number),
                location = COALESCE($4, location),
                industry = COALESCE($5, industry),
                updated_at = CURRENT_TIMESTAMP

                WHERE id = $6

                RETURNING *
                `, [company_name,
            email,
            phone_number,
            location,
            industry, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Client Not Found");
        }

        const { oldValue, newValue } = buildChanges(oldRecord.rows[0], result.rows[0], [
            "company_name",
            "email",
            "phone_number",
            "location",
            "industry"]);

        await createActivityLog({
            entityId: id,
            entityType: 'Client',
            changedBy: req.user.id,
            action: 'Updated',
            oldValue,
            newValue
        });

        res.json(result.rows[0]);

    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Update Client");
    }
}


//Delete Client

const deleteClient = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await pool.query('DELETE FROM clients WHERE id=$1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Client Not Found");
        }

        await createActivityLog(
            {
                entityId: result.rows[0].id,
                entityType: 'Client',
                changedBy: req.user.id,
                action: 'Deleted',
                oldValue: result.rows[0]
            }
        );
        return res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Client");
    }
}

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };