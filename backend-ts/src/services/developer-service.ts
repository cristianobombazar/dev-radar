import developerSchema, {Developer} from '../model/developer';
import githubService from '../services/github-service';

class DeveloperService {

    public findByUsername(github_username: string) {
        return developerSchema.find({github_username});
    }

    public save(developer: Developer) {
        return developerSchema.create(developer);
    }

    async saveByUserName(github_username: string) {
        const developer = await this.findByUsername(github_username);
        if (!developer) {
            const response = await githubService.getDetailsByUsername(github_username);
            const {login, name = login, avatar_url, bio} = response;
            const dev = <Developer>{name, github_username, bio, avatar_url};
            return await this.save(dev);
        }
        return developer;
    }

}

export default new DeveloperService();