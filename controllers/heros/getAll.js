const { Hero } = require("../../models/Hero");
const {RequestError}= require("../../helpers");
const getAll = async (req, res, next) => {
    const page = req.query.page||0;
    const limit= req.query.limit||5;
    const result = await Hero.find({}, "-createdAt -updatedAt").skip(page*limit).limit(limit);
    const total=await Hero.countDocuments();
    const response={
        result,
        page,
        limit,
        total
    }
  res.status(200).json(response);
  if (!result) {
    throw RequestError(404, "Not found");
  }
};
module.exports = getAll;