const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- ROTAS GET ---
app.get('/', (req, res) => {
    res.send('🍔 Servidor do Mister Lanches está ONLINE!');
});

app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos'});
    }
});

// --- ROTA POST (PEDIDOS) ---
// Certifique-se de que ela está ANTES do app.listen
app.post('/api/pedidos', async (req, res) => { // Adicionei async aqui por precaução
    const { itens, total } = req.body;
    const itensJSON = JSON.stringify(itens);
    const query = 'INSERT INTO pedidos (itens, total) VALUES (?, ?)';
    
    try {
        // Se seu db.js usa promises (como na rota de produtos), use assim:
        await db.query(query, [itensJSON, total]);
        res.status(201).json({ message: "Pedido realizado com sucesso!" });
    } catch (err) {
        console.error("Erro ao salvar pedido:", err);
        res.status(500).send("Erro interno no servidor");
    }
});

// --- INICIALIZAÇÃO (SEMPRE POR ÚLTIMO) ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log('\n=========================================');
    console.log(' MISTER LANCHES - SERVIDOR ATIVO');
    console.log(` Rodando em: http://localhost:${PORT}`);
    console.log('=========================================\n');
});