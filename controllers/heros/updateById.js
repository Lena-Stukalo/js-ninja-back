const { Hero } = require("../../models/Hero");
const {RequestError}= require("../../helpers");

const updateById = async (req, res, next) => {
  const result = await Hero.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
module.exports = updateById;