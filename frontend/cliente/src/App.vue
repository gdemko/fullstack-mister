<template>
  <v-app>
    <v-overlay 
      v-model="emManutencaoManual" 
      class="align-center justify-center text-center"
      persistent
      scrim="black"
    >
      <v-card class="pa-8 rounded-xl" elevation="24" max-width="400" color="grey-darken-4">
        <v-icon size="80" color="orange-darken-2" icon="mdi-clock-alert-outline" class="mb-4"></v-icon>
        
        <h2 class="text-h4 font-weight-bold mb-2">Mister Lanches</h2>
        <p class="text-body-1 mb-6 text-grey-lighten-1">
          Nossa cozinha digital está descansando para voltar com tudo!
        </p>
        
        <v-divider class="mb-6"></v-divider>
        
        <div class="text-subtitle-2 text-orange-lighten-2">
          Horário de funcionamento: <br>
          Todos os dias das 18:00 às 23:30
        </div>
      </v-card>
    </v-overlay>

    <v-main>
      <v-container>
        <h1 class="text-h3 mb-6 text-center font-weight-bold">Mister Lanches</h1>
        
        <v-alert
          v-if="temErro"
          type="error"
          variant="tonal"
          title="Sistema Indisponível"
          text="Desculpe, Mister! Nosso sistema de pedidos está em manutenção. Voltamos em breve."
          icon="mdi-wrench"
          class="mb-6"
        ></v-alert>

        <v-row v-if="!temErro && produtos.length === 0">
           <v-col class="text-center">
              <p>Nenhum lanche disponível no momento. 🍔</p>
           </v-col>
        </v-row>
        <v-row v-if="!temErro">
          <v-col v-for="produto in produtos" :key="produto.id" cols="12" sm="6" md="4">
            <v-card elevation="10" class="mx-auto rounded-lg">
              <v-img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500"
                height="200px"
                cover
              ></v-img>

              <v-card-title>{{ produto.nome }}</v-card-title>
              <v-card-subtitle class="text-orange-lighten-2 font-weight-bold">
                R$ {{ produto.preco }}
              </v-card-subtitle>

              <v-card-text>
                {{ produto.descricao }}
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange-lighten-2" variant="tonal" block prepend-icon="mdi-cart">
                  Adicionar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const produtos = ref([]);
const temErro = ref(false);
const emManutencaoManual = ref(false); 

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/produtos');
    produtos.value = response.data;
    temErro.value = false;
  } catch (error) {
    console.error("Erro ao buscar lanches:", error);
    temErro.value = true; 
  }
});
</script>