import { Request, Response } from 'express'
import { Model, Types } from 'mongoose'
import { Agent, Role } from '../types'

export const findAllRoles = (RolesModel: Model<Role>) => async (req: Request, res: Response) => {
  try {
    const roles: Role[] = await RolesModel.find({})
    res.send({ success: true, roles })
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
export const findRoleById = (RolesModel: Model<Role>) => async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
  }
  const role: Role | null = await RolesModel.findById(req.params.id)
  if (!role) {
    return res.status(404).send({ success: false, errors: 'Role not found' })
  }
  res.send({ success: true, role })
}
export const createRole = (RolesModel: Model<Role>) => async (req: Request, res: Response) => {
  try {
    const newRole: Role = await RolesModel.create({ ...req.body })
    res.send({ success: true, role: newRole })
  } catch (e) {
    res.send({ success: false, errors: e })
  }
}
export const updateRole = (RolesModel: Model<Role>) => async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
  }
  const updateRole: Role | null = await RolesModel.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { runValidators: true }
  )
  if (!updateRole) {
    return res.status(404).send({ success: false, errors: 'Role not found' })
  }
  res.send({ success: true, role: updateRole })
}

export const removeRole =
  (RolesModel: Model<Role>, AgentsModel: Model<Agent>) => async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
    }
    const role: Role | null = await RolesModel.findById(req.params.id)
    if (!role) {
      res.status(404).send({ success: false, errors: 'Role not found' })
    }
    if (role) {
      const agentsFromRole: Agent[] = await AgentsModel.find({ role: role.name })
      if (agentsFromRole.length > 0) {
        res.status(424).send({
          success: false,
          errors: 'Failed to delete role. There are agents that belongs to this role',
        })
      }
      if (agentsFromRole.length === 0) {
        await RolesModel.findByIdAndDelete(req.params.id)
        res.send({ success: true })
      }
    }
  }
