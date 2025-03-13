const WebSocket = require('ws');
const PORT = process.env.PORT || 3000; // Render의 PORT 환경 변수 사용

const server = new WebSocket.Server({ port: PORT }, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    // 메시지를 브로드캐스트
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
