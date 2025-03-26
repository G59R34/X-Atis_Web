import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getRemoteConfig } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: "AIzaSyCLlKKYal_9rIZ-m7W6UtUwZC8L3PpiqLw",
  authDomain: "x-at-aa8e5.firebaseapp.com",
  projectId: "x-at-aa8e5",
  storageBucket: "x-at-aa8e5.firebasestorage.app",
  messagingSenderId: "165068810006",
  appId: "1:165068810006:web:b8842d91812e3d25f8d237",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Remote Config with development mode settings
export const remoteConfig = getRemoteConfig(app);
remoteConfig.settings = {
  minimumFetchIntervalMillis: 0, // Fetch every time for development
  fetchTimeoutMillis: 60000, // 1 minute timeout
};

// Default config will be used if remote fetch fails
remoteConfig.defaultConfig = {
  latest_news: JSON.stringify([{
    title: 'Welcome to X-ATIS',
    content: 'Get real-time aviation weather information.',
    date: new Date().toISOString()
  }])
};

export default app; 