import axios from "axios";

class GithubService {

     async getDetailsByUsername(username: string) {
         const response = await axios.get(`https://api.github.com/users/${username}`);
         const {name, login, avatar_url, bio} = response.data; //if the name doesn't exist, it will be replaced by login
         return <GithubAccountDetail> {
             name,
             login,
             avatar_url,
             bio
         }
     }
}

export default new GithubService();