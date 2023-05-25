const express = require('express')
const cntrl = require("../../controllers/heros");
const { cntrlWrapper } = require("../../helpers");
const router = express.Router()

router.get('/', cntrlWrapper(cntrl.getAll))

router.get('/:heroId', cntrlWrapper(cntrl.getHeroById))

router.post('/', cntrlWrapper(cntrl.createHero))

router.delete('/:heroId', cntrlWrapper(cntrl.deleteById))

router.put('/:heroId', cntrlWrapper(cntrl.updateById))

module.exports = router
