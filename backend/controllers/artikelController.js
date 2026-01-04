const db = require("../config/db");

// GET semua artikel
exports.getAllArtikel = (req, res) => {
  db.query("SELECT * FROM artikel", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// POST artikel
exports.createArtikel = (req, res) => {
  const { nama, kategori, users_id } = req.body;

  const sql = `
    INSERT INTO artikel (nama, kategori, users_id)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nama, kategori, users_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Artikel berhasil ditambahkan" });
  });
};
