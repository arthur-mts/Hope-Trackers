import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes';
import path from 'path';
class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setRoutes();
    this.app.listen(8000);
  }

  private setRoutes() {
    this.app.use(router);
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/HopeTrackers', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private setConfig() {
    this.app.use(express.json());
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
  }
}

export default new App().app;