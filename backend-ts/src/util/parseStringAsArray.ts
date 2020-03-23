module.exports = (array: string) => {
  return array.split(',').map(tech => tech.trim());
};