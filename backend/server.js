const express = require('express');
const cors = require('cors');
const db = require('./src/config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- ROTAS GET ---
app.get('/', (req, res) => {
    res.send('Servidor do Mister Lanches está ONLINE!');
});

// Busca produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: 'Erro ao buscar produtos'});
    }
});

// Listando pedidos frontend/admin
app.get('/api/pedidos', async (req, res) => {
    console.log("--- Consultando pedidos para o Admin ---");
    const query = "SELECT * FROM pedidos ORDER BY id DESC";

    try {
        const [rows] = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error("Erro ao buscar pedidos:", err.message);
        res.status(500).json({ error: 'Erro ao carregar pedidos' });
    }
});

// --- ROTA POST (SALVANDO PEDIDOS) ---
app.post('/api/pedidos', async (req, res) => {
    const { itens, total } = req.body;
    const itensJSON = JSON.stringify(itens);
    const query = 'INSERT INTO pedidos (itens, total) VALUES (?, ?)';
    
    try {
        await db.query(query, [itensJSON, total]);
        res.status(201).json({ message: "Pedido realizado com sucesso!" });
    } catch (err) {
        console.error("Erro ao salvar pedido:", err);
        res.status(500).send("Erro interno no servidor");
    }
});

// --- INICIALIZAÇÃO ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log('\n=========================================');
    console.log(' MISTER LANCHES - SERVIDOR ATIVO');
    console.log(` Rodando em: http://localhost:${PORT}`);
    console.log('=========================================\n');
});