const { Hero } = require("../../models/Hero");

const createHero = async (req, res, next) => {
    const img=[]
    if(req.files){
      req.files.forEach((file)=>{
        img.push(file.path)
      });
    }
    console.log(img)
    const result = await Hero.create({ ...req.body, images:[...img]});
    res.status(201).json(result);
};
module.exports = createHero;