import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App); // Resetar estilos

app.use(Antd); //ativa Ant Design
app.mount('#app');
