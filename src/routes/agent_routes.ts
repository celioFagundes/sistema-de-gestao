import express, {  Router } from 'express'
import { findAllAgents, createAgent, updateAgent, removeAgent } from '../controllers/agent_controller'

const router: Router = express.Router()

router.get('/', findAllAgents)
router.post('/', createAgent )
router.put('/:id', updateAgent)
router.delete('/:id', removeAgent)

export default router
