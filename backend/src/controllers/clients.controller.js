const pool = require('../config/db');

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
        let { client_name,
            email,
            location,
            phone_number,
            industry } = req.body;
        let result = await pool.query(`INSERT
                                         INTO clients(client_name,
                                         email,
                                         location,
                                         phone_number,
                                         industry)
                                        values ($1,$2,$3,$4,$5)
                                        RETURNING *`,
            [client_name, email, location, phone_number, industry]
        );

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Create Client");
    }
}

//Update Client

const updateClient = async (req, res) => {
    try {
        const { client_name,
            email,
            phone_number,
            location,
            industry } = req.body;

        const { id } = req.params;

        const result = await pool.query(`
                UPDATE clients
                SET 
                client_name = COALESCE($1, client_name),
                email = COALESCE($2, email),
                phone_number = COALESCE($3, phone_number),
                location = COALESCE($4, location),
                industry = COALESCE($5, industry),
                updated_at = CURRENT_TIMESTAMP

                WHERE id = $6

                RETURNING *
                `, [client_name,
            email,
            phone_number,
            location,
            industry, id]);

        if (result.rows.length === 0) {
            return res.status(404).send("Client Not Found");
        }

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

        res.json(result.rows[0]);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Could not Delete Client");
    }
}

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };