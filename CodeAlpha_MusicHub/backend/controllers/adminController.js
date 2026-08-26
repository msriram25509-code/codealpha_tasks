const db = require("../config/db");

const getOrders = async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM orders ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = { getOrders };