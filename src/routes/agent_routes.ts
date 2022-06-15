import express, {  Router } from 'express'
import { findAllAgents, createAgent, updateAgent, removeAgent, findAgentById } from '../controllers/agent_controller'
import AgentsModel from '../models/agent_model'

const router: Router = express.Router()

router.get('/', findAllAgents(AgentsModel))
router.post('/', createAgent(AgentsModel) )
router.get('/:id', findAgentById(AgentsModel))
router.put('/:id', updateAgent(AgentsModel))
router.delete('/:id', removeAgent(AgentsModel))

export default router
