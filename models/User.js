const db = require('../config/db');

class User {
  static async findAll() {
    const query = `
      SELECT u.id, u.email, u.name, u.created_at, r.name as role 
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      ORDER BY u.id ASC
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  static async findByEmail(email) {
    const query = `
      SELECT u.*, r.name as role,
             (
                SELECT array_agg(rt.path)
                FROM role_routes rr
                JOIN routes rt ON rr.route_id = rt.id
                WHERE rr.role_id = u.role_id
             ) as allowed_routes
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.email = $1
    `;
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT u.id, u.email, u.name, u.created_at, r.name as role 
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  static async create(user) {
    const { email, password, name, role_id } = user;
    const query = `
      INSERT INTO users (email, password, name, role_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, role_id
    `;
    const { rows } = await db.query(query, [email, password, name, role_id]);
    return rows[0];
  }

  static async update(id, updates) {
    const { email, name, role_id, password } = updates;
    // Si se envía un password, actualizamos el password también.
    let query, params;
    if (password) {
      query = `
        UPDATE users 
        SET email = $1, name = $2, role_id = $3, password = $4
        WHERE id = $5
        RETURNING id, email, name, role_id
      `;
      params = [email, name, role_id, password, id];
    } else {
      query = `
        UPDATE users 
        SET email = $1, name = $2, role_id = $3
        WHERE id = $4
        RETURNING id, email, name, role_id
      `;
      params = [email, name, role_id, id];
    }
    const { rows } = await db.query(query, params);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = User;
