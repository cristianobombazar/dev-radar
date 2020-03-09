const {Router} = require('express');
const routes = Router();
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


routes.post('/developer', DevController.save);
routes.get('/developer', DevController.findAll);
routes.delete('/developer/:github_username', DevController.deleteByUsername);
routes.put('/developer/:github_username', DevController.updateByusername);

routes.get('/search', SearchController.search);
module.exports = routes;