const express = require('express')
const cntrl = require("../../controllers/heros");
const { cntrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middelewares");
const { schemas } = require("../../models/Hero");

const router = express.Router()

router.get('/', cntrlWrapper(cntrl.getAll))

router.get('/:heroId',isValidId, cntrlWrapper(cntrl.getHeroById))

router.post('/',validateBody(schemas.addSchema), cntrlWrapper(cntrl.createHero))

router.delete('/:heroId',isValidId, cntrlWrapper(cntrl.deleteById))

router.patch('/:heroId',isValidId,validateBody(schemas.updateSchema), cntrlWrapper(cntrl.updateById))

module.exports = router
