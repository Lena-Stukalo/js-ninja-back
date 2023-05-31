const { Hero } = require("../../models/Hero");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res, next) => {
  const result = await Hero.findByIdAndRemove(req.params.heroId);
  if (!result) {
    next(RequestError(404, "Not found"));
  }
  res.json(result);
};
module.exports = deleteById;
