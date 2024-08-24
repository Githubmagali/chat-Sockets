import { defineConfig } from 'vite'  //Ayuda a que el editor de código proporcione autocompletado y validación de la configuración
import react from '@vitejs/plugin-react' // Este plugin agrega soporte para React en un proyecto de Vite. Simplifica el proceso de configuración y optimiza el manejo de archivos 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // dice a Vite que use este plugin para manejar los archivos de React en tu proyecto.
  server:{ //configura el servidor de desarrollo de vite
    proxy: { //redirige ciertas rutas a un servidor dif durante el desarrollo
      '/socket.io' : { //camino (route) que será redirigido. Todo lo que comience con /socket.io se redirigirá
        target: 'http://localhost:4000', // El destino al que se redirige. En este caso, es 'http://localhost:4000', lo que significa que
        // cualquier solicitud a /socket.io será redirigida al servidor que corre en el puerto 4000 en tu máquina local.
        ws: true //habilita el proxy para websockets. Esto es útil si estás utilizando WebSocket en tu aplicación, por ejemplo, para funcionalidades de tiempo real como chat en vivo o notificaciones.
      }
    }
  }
})
