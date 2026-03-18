# 🍔 Mister Lanches - Full Stack & Framework Comparison Study

Este projeto representa o ápice do Portfólio do 8º Semestre do Centro Universitário - Católica de Santa Catarina (Jaraguá do Sul). Ele consiste em um sistema completo de delivery para o estabelecimento **Mister Lanches**, servindo como base para um estudo comparativo de performance, usabilidade e engenharia de software.

---

## 🎯 Objetivo e Metodologia Comparativa
O objetivo central é desenvolver uma solução robusta para gestão de vendas, enquanto fornece dados técnicos sobre diferentes bibliotecas de componentes do ecossistema **Vue.js**. Para viabilizar este estudo, o sistema foi segmentado em três interfaces distintas:

* **📱 Área do Cliente (Vuetify):** Implementação focada em *Material Design* e experiência *mobile-first*, avaliando a facilidade de navegação para o consumidor final.
* **⚙️ Painel Administrativo (Ant Design Vue):** Focado em componentes de alta densidade de dados para gestão de estoque e relatórios financeiros.
* **🍳 Módulo da Cozinha (PrimeVue):** Utilizado para testar a agilidade na gestão de estados e filas de pedidos em tempo real.

### Critérios de Avaliação do Estudo:
* **Desempenho e Consumo de Recursos:** Impacto de cada biblioteca no carregamento da página (FCP/LCP).
* **Velocidade de Desenvolvimento:** Curva de aprendizado e produtividade com cada framework.
* **Segurança e Portabilidade:** Implementação de camadas de proteção e isolamento de credenciais.

---

## 📊 Documentação de Engenharia
Os diagramas de arquitetura e casos de uso guiam o desenvolvimento deste MVP:
* **Casos de Uso:** Autenticação, Definição de Pedido, Finalização e Gestão Administrativa.
* **Fluxo de Atividades:** Processo completo desde o cadastro do usuário até a notificação e produção na cozinha.

---

## 🛠️ Requisitos do Sistema

### Funcionais (Principais)
- [x] **Segurança:** Sistema de Login e proteção de credenciais via Variáveis de Ambiente (`.env`).
- [x] **Infraestrutura:** Conexão otimizada via *Connection Pool* no MySQL 8.
- [x] **Gestão de Cardápio:** CRUD de produtos integrado ao Backend (Node.js).
- [ ] **Fluxo de Pedidos:** Carrinho de compras e atualização de status em tempo real.

### Não Funcionais (Métricas Acadêmicas)
A aplicação é avaliada rigorosamente por: **Desempenho (CPU/RAM), Segurança da Informação, Qualidade da Documentação e Escalabilidade.**

---

## 💻 Especificações do Ambiente de Testes
Para garantir a isonomia dos testes comparativos e a repetibilidade do experimento:
* **Hardware:** Intel Core i7-11800H | 16GB RAM | SSD 1TB
* **Ambiente:** Windows 10 | Laragon (MySQL 8) | Node.js
* **Stack:** Vue.js 3 (Vite), Express.js e MySQL 8.

---

**Status do Projeto:** 🛠️ Fase de Integração de Dados e Comparação de UI Components.