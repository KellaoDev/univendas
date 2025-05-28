const UserService = require('../service/user');
const bcrypt = require('bcryptjs');

const connection = require('../databaseconfig/db'); 
const userService = new UserService(connection);

const userController = {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const userId = await userService.createUser({ name, email, password });

      return res.status(200).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: { userId },
        meta: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar usuário',
        error: error.message
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: 'Senha incorreta'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: { id: user.id, name: user.name, email: user.email }
        },
        meta: { timestamp: new Date().toISOString() }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao realizar login',
        error: error.message
      });
    }
  }
};

module.exports = userController;
