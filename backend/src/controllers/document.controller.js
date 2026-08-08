const createDocument = async (req, res) => {
    console.log(req.body)
    console.log(req.params);
    console.log(req.file);

    res.json(
        {
            message: "file Recieved"
        }
    )


}

module.exports = { createDocument }