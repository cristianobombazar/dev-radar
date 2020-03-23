module.exports = (latitude: any, longitude: any) => {
  return {type: 'Point', coordinates: [longitude, latitude] };
};