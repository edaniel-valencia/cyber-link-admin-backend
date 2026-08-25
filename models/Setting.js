const db = require('../config/db');

class Setting {
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM settings ORDER BY id ASC');
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM settings WHERE id = $1', [id]);
    return rows[0];
  }

  static async create(setting) {
    const { key, value, description } = setting;
    const query = `
      INSERT INTO settings (key, value, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const { rows } = await db.query(query, [key, value, description]);
    return rows[0];
  }

  static async update(id, updates) {
    const { key, value, description } = updates;
    const query = `
      UPDATE settings 
      SET key = $1, value = $2, description = $3
      WHERE id = $4
      RETURNING *
    `;
    const { rows } = await db.query(query, [key, value, description, id]);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM settings WHERE id = $1 RETURNING id';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Setting;
