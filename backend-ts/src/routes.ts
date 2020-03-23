import {Router, Request, Response} from "express";
import DeveloperController from './controller/developer-controller';

const routes = Router();

DeveloperController.routes(routes);

routes.get('/', (req: Request, res: Response) => {
    return res.json({
        "version": "0.0.0.1",
        'developer': 'Cristiano Bombazar'
    });
});

export default routes;