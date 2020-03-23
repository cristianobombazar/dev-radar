const Developer = require('../model/Developer');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async search(request, response) {
    console.log("Entrou aqui");
    console.log(request.query.latitude);
    console.log(request.query.longitude);
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
          $maxDistance: 120000
        }
      }
    });
    return response.json({devs});
  }
}