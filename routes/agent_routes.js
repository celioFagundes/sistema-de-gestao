const express = require('express')
const agentController = require('../controllers/agent_controller')

const router = express.Router()

router.get('/', agentController.index)
router.post('/', agentController.create)
router.put('/:id', agentController.update)
router.delete('/:id', agentController.update)

module.exports = router