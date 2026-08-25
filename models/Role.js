const db = require('../config/db');

class Role {
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM roles ORDER BY id ASC');
    return rows;
  }
}

module.exports = Role;
