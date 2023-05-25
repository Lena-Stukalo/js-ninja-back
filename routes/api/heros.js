const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:heroId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:heroId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:heroId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
