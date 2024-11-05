// controllers/itemController.js
const db = require('../config/database');

// Get all items
exports.getAllItems = (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) {
      console.error('Error fetching items:', err);
      return res.status(500).json({
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
    if (!rows.length) {
      return res.status(404).json({ message: 'No items found' });
    }
    res.json(rows);
  });
};

// Get a single item by ID
exports.getItemById = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID provided' });
  }

  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching item:', err);
      return res.status(500).json({
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }
    if (!row) {
      return res.status(404).json({ error: `Item with ID ${id} not found` });
    }
    res.json(row);
  });
};

// Create a new item
exports.createItem = (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  db.run(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name, description],
    function (err) {
      if (err) {
        console.error('Error creating item:', err);
        return res.status(500).json({
          error: 'Failed to create item',
          details:
            process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
      }
      res.status(201).json({
        id: this.lastID,
        name,
        description,
        message: 'Item created successfully',
      });
    }
  );
};

// Update an existing item
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID provided' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // First check if the item exists
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error checking item existence:', err);
      return res.status(500).json({
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }

    if (!row) {
      return res.status(404).json({ error: `Item with ID ${id} not found` });
    }

    // If item exists, proceed with update
    db.run(
      'UPDATE items SET name = ?, description = ? WHERE id = ?',
      [name, description, id],
      function (err) {
        if (err) {
          console.error('Error updating item:', err);
          return res.status(500).json({
            error: 'Failed to update item',
            details:
              process.env.NODE_ENV === 'development' ? err.message : undefined,
          });
        }
        if (this.changes === 0) {
          return res.status(404).json({ error: 'No changes made to the item' });
        }
        res.json({
          id: Number(id),
          name,
          description,
          message: 'Item updated successfully',
        });
      }
    );
  });
};

// Delete an item
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID provided' });
  }

  // First check if the item exists
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error checking item existence:', err);
      return res.status(500).json({
        error: 'Internal server error',
        details:
          process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    }

    if (!row) {
      return res.status(404).json({ error: `Item with ID ${id} not found` });
    }

    // If item exists, proceed with deletion
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
      if (err) {
        console.error('Error deleting item:', err);
        return res.status(500).json({
          error: 'Failed to delete item',
          details:
            process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
      }
      res.json({
        message: 'Item deleted successfully',
        id: Number(id),
      });
    });
  });
};
