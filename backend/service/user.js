const User = require('../model/user');

class UserService {
  constructor(connection) {
    this.connection = connection;
  }

  async findUserByEmail(email) {
    return await User.findUserByEmail(email, this.connection);
  }

  async createUser(userData) {
    return await User.createUser(userData, this.connection);
  }
}

module.exports = UserService;
