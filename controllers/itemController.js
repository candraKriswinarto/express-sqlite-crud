// controllers/itemController.js
const db = require('../config/database');

// Get all items
exports.getAllItems = (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Get a single item by ID
exports.getItemById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};

// Create a new item
exports.createItem = (req, res) => {
  const { name, description } = req.body;
  db.run(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name, description],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, description });
    }
  );
};

// Update an existing item
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.run(
    'UPDATE items SET name = ?, description = ? WHERE id = ?',
    [name, description, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, name, description });
    }
  );
};

// Delete an item
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item deleted successfully' });
  });
};
