import  {  Router } from 'express'
import { findAllAgents, createAgent, updateAgent, removeAgent, findAgentById, findAgentByName } from '../controllers/agent_controller'
import AgentsModel from '../models/agent_model'

const router = Router()

router.get('/', findAllAgents(AgentsModel))
router.post('/', createAgent(AgentsModel) )
router.get('/:id', findAgentById(AgentsModel))
router.put('/:id', updateAgent(AgentsModel))
router.delete('/:id', removeAgent(AgentsModel))
router.get('/name/:name', findAgentByName(AgentsModel))

export default router
