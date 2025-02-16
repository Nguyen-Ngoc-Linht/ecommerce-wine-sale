// plugins/websocket.js
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

export default ({ app }, inject) => {
  const socket = new SockJS('http://103.154.62.40:8000/notification-service/api/v1.0/ws')

  const stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {},
    onConnect: () => {
      console.log('✅ WebSocket Connected')
      stompClient.subscribe('/topic/notifications', (message) => {
        const notification = JSON.parse(message.body)
        window.dispatchEvent(new CustomEvent('new-notification', { detail: notification }))
      })
    },
    onStompError: (frame) => {
      console.error('❌ Broker error:', frame.headers['message'])
    },
  })

  stompClient.activate()

  // Provide the client globally
  inject('stompClient', stompClient)
}
