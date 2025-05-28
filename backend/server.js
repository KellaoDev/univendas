const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const route = require('./route/routes')
app.use(route)

app.use((err, req, res, next) => {
    console.error('Erro global:', err.stack)
    res.status(500).json({ error: 'Erro interno no servidor' })
})

module.exports = app;
