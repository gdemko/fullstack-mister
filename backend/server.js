const express = require('express'); //Transforma node em servidor web
const cors = require('cors'); //Abre a porta do servidor p/Frontend
const db = require('./src/config/db'); //Conexão com MySQL

const app = express();

// Middlewares (Configurações de segurança e dados)
app.use(cors()); // Permissão o Frontend acessar o Backend
app.use(express.json()) // Permite que o servido entenda o JSON

// Rota de Teste Direta (Confirmação se servidor está ativo)
app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos no banco'});
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log('\n=========================================');
    console.log(' MISTER LANCHES - SERVIDOR ATIVO');
    console.log(`  Rodando em: http://localhost:${PORT}`);
    console.log('=========================================\n')
});