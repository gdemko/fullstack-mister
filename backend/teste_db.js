const db = require('./src/config/db');

async function testar() {
    console.log('Iniciando teste de conexão...'); 
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS resultado');
        console.log('Conexão com o MySQL realizada com sucesso!');
        console.log('Resultado do cálculo (1+1):', rows[0].resultado);
        process.exit();
    } catch (error) {
        console.error('ERRO DETECTADO:', error.message);
        process.exit(1);
    }
}

testar();