const app = require('./server');
const pool = require('./databaseconfig/db');

async function startServer() {
    try {
        const connection = await pool.getConnection()
        console.log('✅ MySQL conectado com sucesso!')
        connection.release()

        const PORT = 3000

        app.listen(PORT, () => {
            console.log(`🔗 Acesse: http://localhost:${PORT}`)
        })

    } catch (err) {
        console.error('❌ Falha ao conectar no MySQL:', err.message)
        process.exit(1)
    }
}

startServer()
