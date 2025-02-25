// plugins/websocket.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default ({ store }, inject) => {
  const socket = new SockJS('http://103.154.62.40:8000/notification-service/api/v1.0/ws');

  const stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {},
    onConnect: () => {
      console.log('✅ WebSocket Connected');
      stompClient.subscribe('/topic/user/0a1ef7ac-41e5-439d-909a-34c2f2f2b439/notifications', (message) => {
        console.log('Received message:', message.body);
        const notification = JSON.parse(message.body);

        // Thêm thông báo vào Vuex store
        store.dispatch('addNotification', notification);
      });
    },
    onStompError: (frame) => {
      console.error('❌ Broker error:', frame.headers['message']);
    },
  });

  stompClient.activate();

  // Provide the client globally
  inject('stompClient', stompClient);
};
