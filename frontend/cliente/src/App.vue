<template>
  <v-app>
    <v-overlay v-model="emManutencaoManual" class="align-center justify-center text-center" persistent scrim="black">
      <v-card class="pa-8 rounded-xl" elevation="24" max-width="400" color="grey-darken-4">
        <v-icon size="80" color="orange-darken-2" icon="mdi-clock-alert-outline" class="mb-4"></v-icon>
        <h2 class="text-h4 font-weight-bold mb-2">Mister Lanches</h2>
        <p class="text-body-1 mb-6 text-grey-lighten-1">Nossa cozinha digital está descansando!</p>
        <v-divider class="mb-6"></v-divider>
        <div class="text-subtitle-2 text-orange-lighten-2">Horário: 18:00 às 23:30</div>
      </v-card>
    </v-overlay>

    <v-main>
      <v-container>
        <h1 class="text-h3 mb-6 text-center font-weight-bold">Mister Lanches</h1>
        
        <v-row v-if="!temErro">
          <v-col v-for="produto in produtos" :key="produto.id" cols="12" sm="6" md="4">
            <v-card elevation="10" class="mx-auto rounded-lg">
              <v-img :src="produto.imagem_url" height="200px" cover></v-img>
              <v-card-title>{{ produto.nome }}</v-card-title>
              <v-card-subtitle class="text-orange-lighten-2 font-weight-bold">
                R$ {{ Number(produto.preco).toFixed(2) }}
              </v-card-subtitle>
              <v-card-text>{{ produto.descricao }}</v-card-text>
              <v-card-actions>
                <v-btn color="orange-lighten-2" variant="tonal" block prepend-icon="mdi-cart" @click="adicionarItem(produto)">
                  Adicionar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="abrirResumoCarrinho" width="auto" persistent max-width="400">
      <v-card class="pa-4 rounded-xl flutuante-card" elevation="24">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="text-h5 font-weight-bold">Meu Pedido</span>
          <v-btn icon="mdi-close" variant="text" @click="abrirResumoCarrinho = false"></v-btn>
        </v-card-title>

        <v-card-text class="pa-0">
          <v-list lines="one" bg-color="transparent">
            <v-list-item v-for="(item, index) in carrinho" :key="index" :title="item.nome" prepend-icon="mdi-food">
              <template v-slot:append>
                <div class="font-weight-bold">R$ {{ Number(item.preco).toFixed(2) }}</div>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-divider class="my-4"></v-divider>

        <div class="d-flex justify-space-between w-100 pa-4 text-h6 font-weight-bold">
          <span>Total:</span>
          <span class="text-orange-lighten-2">R$ {{ totalPedido.toFixed(2) }}</span>
        </div>

        <v-card-actions>
          <v-btn 
            color="orange-darken-2" 
            block 
            size="large" 
            variant="elevated"
            @click="finalizarPedido"
          >
            Finalizar Pedido
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn v-if="carrinho.length > 0" color="orange-darken-2" icon size="x-large" elevation="12" class="botao-flutuante" @click="abrirResumoCarrinho = !abrirResumoCarrinho">
      <v-badge :content="carrinho.length" color="red" offset-x="10" offset-y="10">
        <v-icon size="32">mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <v-snackbar
      v-model="mostrarSucesso"
      color="success"
      location="center"
      vertical
      multi-line
      :timeout="4000"
      class="text-center"
    >
      <v-icon size="large" class="mb-2">mdi-check-circle</v-icon>
      <div class="text-h6">Pedido enviado para a cozinha! 🔥</div>
      <p>Agora é só aguardar o Mister preparar seu lanche.</p>
    </v-snackbar>

  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'; // Importação única e limpa
import axios from 'axios';

const produtos = ref([]);
const carrinho = ref([]); 
const temErro = ref(false);
const emManutencaoManual = ref(false); 
const abrirResumoCarrinho = ref(false);
const mostrarSucesso = ref(false);

const finalizarPedido = async () => {
  if (carrinho.value.length === 0) return;

  try {
    const pedido = {
      itens: carrinho.value.map(item => item.nome),
      total: totalPedido.value
    };

    console.log("Enviando pedido para o servidor...", pedido);

    const response = await axios.post('http://localhost:3000/api/pedidos', pedido);
    
    if (response.status === 201 || response.status === 200) {
      // ATIVA O SNACKBAR CENTRALIZADO
      mostrarSucesso.value = true;
      
      // LIMPA O CARRINHO E FECHA O MODAL
      carrinho.value = [];
      abrirResumoCarrinho.value = false;
    }
  } catch (error) {
    console.error("Erro detalhado no envio:", error);
    
    if (error.response) {
      alert(`Erro no Servidor: ${error.response.status} - ${error.response.data.message || error.response.data}`);
    } else if (error.request) {
      alert("O Servidor não respondeu. Verifique se o Node.js está rodando na porta 3000.");
    } else {
      alert("Erro ao configurar a requisição.");
    }
  }
};

// Lógica do Total calculada automaticamente
const totalPedido = computed(() => {
  return carrinho.value.reduce((total, item) => total + Number(item.preco), 0);
});

const adicionarItem = (lanche) => {
  carrinho.value.push(lanche);
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/produtos');
    produtos.value = response.data;
  } catch (error) {
    console.error("Erro:", error);
    temErro.value = true; 
  }
});

</script>

<style scoped>
.v-btn--icon.botao-flutuante {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}
.flutuante-card {
  background: rgba(45, 45, 45, 0.80) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}
:deep(.v-badge__wrapper) { margin-left: 4px; }
</style>