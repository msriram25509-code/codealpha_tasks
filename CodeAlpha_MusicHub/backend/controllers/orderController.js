const db = require("../config/db");

// Place Order
const placeOrder = async (req, res) => {
    try {
        const { customer_name, customer_email, total_amount } = req.body;

        await db.query(
            `INSERT INTO orders
            (customer_name, customer_email, total_amount)
            VALUES ($1,$2,$3)`,
            [customer_name, customer_email, total_amount]
        );

        res.status(201).json({
            message: "Order Placed Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// My Orders
const getMyOrders = async (req, res) => {
    try {
        const { email } = req.query;

        const result = await db.query(
            "SELECT * FROM orders WHERE customer_email=$1 ORDER BY id DESC",
            [email]
        );

        res.json(result.rows);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    placeOrder,
    getMyOrders
};