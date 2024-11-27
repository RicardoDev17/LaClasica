importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Inicializar Firebase en el Service Worker usando la configuración de tu proyecto
firebase.initializeApp({
  apiKey: "AIzaSyBidqMx8zbQRAo8ynfv6u-ULUs87DHpzgg",
  authDomain: "gymapp-84e17.firebaseapp.com",
  projectId: "gymapp-84e17",
  storageBucket: "gymapp-84e17.firebasestorage.app",
  messagingSenderId: "1062454112173",
  appId: "1:1062454112173:web:ef32b2385508c6c44f3b24",
  vapidKey: "BCtDwGmFEoX0qLrnio32GQAFHnWg96ygu6MXdtQC7YQoN1z1t4w5oACo5Y1sqsQ7SUk9J1vCbUPi-mE---nAeNE",
  measurementId: "G-SJ8HB2P1V3"
});

// Recuperar una instancia de Firebase Messaging para manejar mensajes en segundo plano
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icon/favicon.png' // Icono de notificación
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});