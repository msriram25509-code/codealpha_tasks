const bcrypt = require("bcrypt");
const db = require("../config/db");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: "Registration Successful"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        message: "Invalid Password"
      });
    }

    res.json({
      message: "Login Successful",
      name: user.name
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }

};

module.exports = {
  register,
  login
};