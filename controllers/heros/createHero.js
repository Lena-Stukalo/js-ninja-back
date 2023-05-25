const { Hero } = require("../../models/Hero");

const createHero = async (req, res, next) => {
    const result = await Hero.create({ ...req.body});
    res.status(201).json(result);
};
module.exports = createHero;