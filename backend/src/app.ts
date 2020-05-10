import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import router from './routes';
import path from 'path';
import dotenv from 'dotenv';
import io from 'socket.io';
import {createServer, Server} from 'http';

import {connectSocket, disconnectSocket, ISocket} from './services/UserOnlineService';

class App {
  public app: Application;
  public server: Server;
  private io: io.Server;

  constructor() {
    this.app = express();
    this.setConfig();
    console.log(process.env);

    this.setMongoConfig();
    // Set Socket
    this.server = createServer(this.app);
    this.io = io(this.server);
    this.setSocket();
    this.setRoutes();
    this.app.listen(String(process.env.HTTP_PORT));
  }

  private setRoutes() {
    this.app.use(router);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost:${process.env.MONGO_PORT}/${process.env.DATABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private setConfig() {
    dotenv.config();
    this.app.use(express.json());
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
  }
  
  private setSocket(){
    this.server.listen(String(process.env.IO_PORT), ()=>{
      console.log('Server on!');
    })
  }

  private listen(){
    this.io.on('connection', (socket: ISocket) => {
      connectSocket(socket.id ,socket)      
    })

    this.io.on('disconnect',(socket: ISocket)=>{
      disconnectSocket(socket.id);
    })
  }


}

export default new App().app;
