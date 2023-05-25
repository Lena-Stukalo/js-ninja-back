const { Hero } = require("../../models/Hero");
const {RequestError}= require("../../helpers");
const getAll = async (req, res, next) => {
    const result = await Hero.find({}, "-createdAt -updatedAt");
  res.json(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
};
module.exports = getAll;