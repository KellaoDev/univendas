const bcrypt = require('bcryptjs');

class User {
  static async findUserByEmail(email, connection) {
    try {
      const query = `SELECT * FROM users WHERE email = ?`;
      const params = [email];

      const [rows] = await connection.query(query, params);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async createUser(insertData, connection) {
    try {
      const { name, email, password } = insertData;
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      const params = [name, email, hashedPassword];

      const [rows] = await connection.query(query, params);
      return rows.insertId;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
