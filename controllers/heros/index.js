const getAll = require("./getAll");
const getHeroById = require("./getById");
const createHero = require("./createHero");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
module.exports = {
    updateById,
    deleteById,
    createHero,
    getHeroById,
    getAll
};