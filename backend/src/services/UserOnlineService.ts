import { Socket } from 'socket.io';

interface Connections {
  [key: string]: Socket;
}

const connections: Connections = {};

export function connectSocket(key: string, socket: Socket) {
  connections[key] = socket;
}

export function disconnectSocket(key: string) {
  delete connections[key];
}

export function findSocket(key: string) {
  return connections[key];
}

export interface ISocket extends Socket {
  id: string;
}
