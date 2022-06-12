import { Request, Response } from 'express'
import AgentsModel from '../models/agent_model'
import { Agent } from '../types'

export const findAllAgents = async (req: Request, res: Response) => {
  try {
    const agents: Agent[] = await AgentsModel.find({})
    res.send(agents)
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}

export const createAgent = async (req: Request, res: Response) => {
  try {
    const newAgent: Agent = await AgentsModel.create({ ...req.body })
    res.send(newAgent)
  } catch (e) {
    res.send({ success: false, errors: e })
  }
} 
export const updateAgent = async (req: Request, res: Response) => {
  try {
    const updateAgent: Agent | null = await AgentsModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { runValidators: true }
    )
    res.send(updateAgent)
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
export const removeAgent = async (req: Request, res: Response) => {
  try {
    await AgentsModel.findByIdAndDelete(req.params.id)
    res.send({
      success: true,
    })
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
