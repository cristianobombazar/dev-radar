const axios = require('axios');
const Developer = require('../model/Developer');
const parseStringAsArray = require('../utils/parseStringAsArray');
const coordinatesAsLocationPoint = require('../utils/coordinateAsLocationPoint');

module.exports = {

  async findAll(req, res) {
    return res.json(await Developer.find());
  },

  async save(req, res) {
    const {github_username, techs, latitude, longitude } = req.body;

    let dev = await Developer.findOne({github_username});
    if (!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`);

      const {name = login, avatar_url, bio} = response.data; //if the name doesn't exist, it will be replaced by login
        
      dev = await Developer.create( {
        github_username,
        name,
        avatar_url,
        bio,
        techs: parseStringAsArray(techs),
        location: coordinatesAsLocationPoint(latitude, longitude)
      });
    }
    return res.json(dev);
  },

  async deleteByUsername(request, response) {
    const {github_username} = request.params;
    if (github_username) {
      await Developer.findOneAndRemove( {github_username})      
    } 
    return response.json();
  },

  async updateByusername(request, response) {
    const {github_username} = request.params;
    const {techs, name, avatar_url, bio, latitude, longitude } = request.body;
    dev =  { 
      name, 
      avatar_url, 
      bio, 
      techs: parseStringAsArray(techs), 
      location: coordinatesAsLocationPoint(latitude, longitude) };
    if (github_username) {
      await Developer.findOneAndUpdate({github_username}, dev)
    }
    return response.json();
  }

};