require('dotenv').config();
const mysql = require('mysql2');

// Criando um "Pool" de conexões (mais eficiente para produção)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testando a conexão assim que o servidor subir
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro ao conectar no MySQL do Mister Lanches:', err.message);
    } else {
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
        connection.release();
    }
});

module.exports = pool.promise();