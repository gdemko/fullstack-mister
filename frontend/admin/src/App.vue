<template>
  <div style="padding: 24px; background: #f0f2f5; min-height: 100vh;">
    <a-card title="Gestão de Pedidos - Mister Lanches" :bordered="false">
      
      <a-table :dataSource="pedidos" :columns="colunas" rowKey="id" :loading="carregando">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'itens'">
            <a-tag v-for="item in converterItens(record.itens)" :key="item" color="orange">
              {{ item }}
            </a-tag>
          </template>
          
          <template v-else-if="column.key === 'total'">
            <span style="font-weight: bold; color: #fa8c16;">
              R$ {{ Number(record.total).toFixed(2) }}
            </span>
          </template>
        </template>
      </a-table>

    </a-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pedidos = ref([]);
const carregando = ref(true);

// Definição das colunas da tabela
const colunas = [
  { 
    title: 'Nº Pedido',
    dataIndex: 'id', 
    key: 'id' 
  },
  { 
    title: 'Itens do Pedido',
    dataIndex: 'itens', 
    key: 'itens' 
  },
  { 
    title: 'Total Pago',
    dataIndex: 'total', 
    key: 'total',
    align: 'right'
  },
];

// Buscando dados no Backend
const buscarPedidos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/pedidos');
    pedidos.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
  } finally {
    carregando.value = false;
  }
};

// Convertendo String JSON
const converterItens = (itensString) => {
  try {
    return JSON.parse(itensString);
  } catch (e) {
    return [itensString]; // Se não, retorna o texto puro
  }
};

onMounted(buscarPedidos);
</script>