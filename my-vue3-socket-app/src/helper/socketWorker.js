import { io } from 'socket.io-client';

const socket = io("http://localhost:8000");

socket.on('connect', () => {
  console.log("Worker connected to WebSocket server");
});

socket.on('disconnect', (reason) => {
  console.log(`Worker disconnected: ${reason}`);
});

socket.on('randomData', (data) => {
  postMessage(data);
});

self.onmessage = (event) => {
  if (event.data === 'close') {
    socket.disconnect();
    self.close();
  }
};