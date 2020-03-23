import {Controller} from "./controller";
import {Request, Response, Router} from "express";
import developerService from '../services/developer-service';

class DeveloperController implements Controller{

    public routes(router: Router): void {
        this.addGetRoutes(router);
    }

    private addGetRoutes(router: Router) {
        router.get("/developer", async (request: Request, response: Response): Promise<any> => {
            return await this.findAll(request, response);
        });
        router.get("/developer/:id", (request: Request, response: Response): any => {
            return null;
        });
        router.post("/developer", async (request: Request, response: Response): Promise<any> => {
            return await this.save(request, response);
        });
        router.put("/developer/:id", (request: Request, response: Response): any => {
            return null;
        });
        router.put("/developer/:id/coordinates", (request: Request, response: Response): any => {
            return null;
        });
        router.put("/developer/:id/techs", (request: Request, response: Response): any => {
            return null;
        });
        router.delete("/developer/:id", (request: Request, response: Response): any => {
            return null;
        });
    }

    async findAll(request: Request, response: Response) {
        const {github_username} = request.params;
        return response.json(developerService.findByUsername(github_username));
    };

    async save(request: Request, response: Response) {
        const {github_username} = request.body;
        return response.json(developerService.saveByUserName(github_username));
    }


};

export default new DeveloperController();
