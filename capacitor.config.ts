import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Pasteleria Mimi',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Tiempo en milisegundos que se muestra el splash
      launchAutoHide: true, // Ocultar automáticamente después del tiempo definido
      backgroundColor: " #f81d75", // Color de fondo del splash
      splashFullScreen: true, // Mostrar en pantalla completa
      splashImmersive: true // Ocultar barra de estado
    }
  }

};

export default config;
