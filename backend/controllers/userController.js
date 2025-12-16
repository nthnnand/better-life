const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findByEmail(email, (err, rows) => {
    if (rows.length > 0) return res.status(400).json({ msg: "Email sudah terdaftar" });

    bcrypt.hash(password, 10, (err, hashed) => {
      User.create({ name, email, password: hashed }, (err) => {
        if (err) return res.status(500).json({ msg: "DB Error" });
        res.json({ msg: "Registrasi Berhasil" });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, rows) => {
    if (rows.length === 0) return res.status(400).json({ msg: "Email tidak ditemukan" });

    const user = rows[0];

    bcrypt.compare(password, user.password, (err, ok) => {
      if (!ok) return res.status(400).json({ msg: "Password salah" });

      const token = jwt.sign({ id: user.id }, "secretkey");

      res.json({ msg: "Login berhasil", token });
    });
  });
};

exports.getProfile = (req, res) => {
  User.findById(req.userId, (err, rows) => {
    res.json(rows[0]);
  });
};
