const db = require('../config/db');

class Service {
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM services ORDER BY id DESC');
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query('SELECT * FROM services WHERE id = $1', [id]);
    return rows[0];
  }

  static async create(service) {
    const { image, name, description, price, discount, promotions, promo_code, stock } = service;
    const query = `
      INSERT INTO services (image, name, description, price, discount, promotions, promo_code, stock)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const { rows } = await db.query(query, [
      image, name, description, price, discount || 0, promotions || false, promo_code, stock === '' ? null : stock
    ]);
    return rows[0];
  }

  static async update(id, updates) {
    const { image, name, description, price, discount, promotions, promo_code, stock } = updates;
    const query = `
      UPDATE services 
      SET image = $1, name = $2, description = $3, price = $4, discount = $5, promotions = $6, promo_code = $7, stock = $8
      WHERE id = $9
      RETURNING *
    `;
    const { rows } = await db.query(query, [
      image, name, description, price, discount || 0, promotions || false, promo_code, stock === '' ? null : stock, id
    ]);
    return rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM services WHERE id = $1 RETURNING id';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }
}

module.exports = Service;
