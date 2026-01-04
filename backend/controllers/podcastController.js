const db = require("../config/db");

// GET semua podcast
exports.getAllPodcast = (req, res) => {
  db.query("SELECT * FROM podcast", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// POST podcast
exports.createPodcast = (req, res) => {
  const { judul, deskripsi, users_id } = req.body;

  const sql = `
    INSERT INTO podcast (judul, deskripsi, users_id)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [judul, deskripsi, users_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Podcast berhasil ditambahkan" });
  });
};
