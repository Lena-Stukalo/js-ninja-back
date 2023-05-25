const { Hero } = require("../../models/Hero");
const {RequestError}= require("../../helpers");

const getById = async (req, res, next) => {
    const result = await Hero.findById(req.params.heroId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
module.exports = getById;