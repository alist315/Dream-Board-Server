const express = require('express')

const DreamCtrl = require('../controllers/dream-ctrl')

const router = express.Router()

router.post('/dream', DreamCtrl.createDream)
router.put('/dream/:id', DreamCtrl.updateDream)
router.delete('/dream/:id', DreamCtrl.deleteDream)
router.get('/dream/:id', DreamCtrl.getDreamById)
router.get('/dreams', DreamCtrl.getDreams)

module.exports = router;
