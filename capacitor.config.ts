import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.routestamp.app',
  appName: 'RouteStamp',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#6ea857",
      showSpinner: false,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#6ea857',
    }
  }
};

export default config;
