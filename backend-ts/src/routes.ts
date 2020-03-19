import {Router, Request, Response} from "express";

const routes = Router();
routes.get('/', (req: Request, res: Response) => {
    return res.json({
        "version": "0.0.0.1",
        'developer': 'Cristiano Bombazar'
    });
});

export default routes;