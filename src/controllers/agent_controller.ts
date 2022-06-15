import { Request, Response } from 'express'
import { Model, Types } from 'mongoose'
import { Agent } from '../types'

export const findAllAgents = (AgentsModel: Model<Agent>) => async (req: Request, res: Response) => {
  try {
    const agents: Agent[] = await AgentsModel.find({})
    res.send({ success: true, agents })
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
export const findAgentById = (AgentsModel: Model<Agent>) => async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
  }
  const agent: Agent | null = await AgentsModel.findById(req.params.id)
  if (!agent) {
    return res.status(404).send({ success: false, errors: 'Agent not found' })
  }
  res.send({ success: true, agent })
}

export const createAgent = (AgentsModel: Model<Agent>) => async (req: Request, res: Response) => {
  try {
    const newAgent: Agent = await AgentsModel.create({ ...req.body })
    res.send({ success: true, agent: newAgent })
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
export const updateAgent = (AgentsModel: Model<Agent>) => async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
  }
  const updateAgent: Agent | null = await AgentsModel.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { runValidators: true }
  )
  if (!updateAgent) {
    return res.status(404).send({ success: false, errors: 'Agent not found' })
  }
  res.send({ success: true, agent: updateAgent })
}
export const removeAgent = (AgentsModel: Model<Agent>) => async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
  }
  try {
    await AgentsModel.findByIdAndDelete(req.params.id)
    res.send({
      success: true,
    })
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
