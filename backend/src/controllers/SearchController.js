const Developer = require('../model/Developer');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async search(request, response) {
    const {latitude, longitude, techs} = request.query;
    const techsArray = parseStringAsArray(techs);

    const devs = await Developer.find( {
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000
        }
      }
    });
    return response.json({devs});
  }
}