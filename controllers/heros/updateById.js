const { Hero } = require("../../models/Hero");
const {RequestError}= require("../../helpers");

const updateById = async (req, res, next) => {
    const img=[]
    if(req.files){
      req.files.forEach((file)=>{
        img.push(file.path)
      });
    }
  const result = await Hero.findByIdAndUpdate(
    req.params.heroId,
    {...req.body, $push:{images:[...img]}},
    { new: true }
  );
  console.log(result)
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
module.exports = updateById;