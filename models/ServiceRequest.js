const db = require('../config/db');

class ServiceRequest {
  static async findAll() {
    const query = `
      SELECT sr.*, u.name as user_name, u.email, s.name as service_name, s.price 
      FROM service_requests sr
      JOIN users u ON sr.user_id = u.id
      JOIN services s ON sr.service_id = s.id
      ORDER BY sr.id DESC
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  static async findByUserId(userId) {
    const query = `
      SELECT sr.*, s.name as service_name, s.price 
      FROM service_requests sr
      JOIN services s ON sr.service_id = s.id
      WHERE sr.user_id = $1
      ORDER BY sr.id DESC
    `;
    const { rows } = await db.query(query, [userId]);
    return rows;
  }

  static async create({ user_id, service_id, payment_receipt, notes }) {
    const query = `
      INSERT INTO service_requests (user_id, service_id, payment_receipt, notes)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const { rows } = await db.query(query, [user_id, service_id, payment_receipt, notes]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE service_requests 
      SET status = $1
      WHERE id = $2
      RETURNING *
    `;
    const { rows } = await db.query(query, [status, id]);
    return rows[0];
  }
}

module.exports = ServiceRequest;
