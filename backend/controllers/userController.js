const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER (OPTIONAL, BASIC)
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";

  db.query(sql, [name, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ msg: "Register gagal" });
    res.json({ msg: "Register berhasil" });
  });
};

// LOGIN + ROLE
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).json({ msg: "Server error" });
    if (result.length === 0)
      return res.status(401).json({ msg: "Email tidak ditemukan" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ msg: "Password salah" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });
  });
};

// PROFILE
exports.getProfile = (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role
  });
};
