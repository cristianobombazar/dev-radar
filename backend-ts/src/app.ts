import express, {Application } from 'express';
import mongoose, {Mongoose} from 'mongoose';
import routes from './routes';

class App {

    public app : Application;

    constructor() {
        this.app = express();
        this.addJsonSupport();
        this.connectMongoDb();
        this.addRoutes();
        this.initializePort();
    }

    private addJsonSupport(): void {
        this.app.use(express.json());
    };

    private connectMongoDb(): void {
        mongoose.connect('mongodb+srv://mongo:mongodb@omnistack10-jvggi.mongodb.net/week10?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((value: Mongoose) => {
            console.log('Connected to mongodb. Version: '+value.version);
        });
    };

    private addRoutes() {
        this.app.use(routes);
    }

    private initializePort() {
        this.app.listen(4300);
    }
}

export default new App();