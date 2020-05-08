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
  private ioPort = process.env.IO_PORT;
  private expressPort = process.env.HTTP_PORT;
  private mongoUrl = process.env.MONGO_URL!;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    // Set Socket
    this.server = createServer(this.app);
    this.io = io(this.server);
    this.setSocket();
    this.setRoutes();
    this.app.listen(this.expressPort);
  }

  private setRoutes() {
    this.app.use(router);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, {
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
    this.server.listen(this.ioPort, ()=>{
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