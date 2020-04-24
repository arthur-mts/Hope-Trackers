import express, { Application } from 'express';
import mongoose from 'mongoose'

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.app.listen(8000);
        this.setMongoConfig();
        this.app.get('/', (req, res) => {
            res.send('mesage')
        })
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost:27017/HopeTrackers", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}

export default new App().app;