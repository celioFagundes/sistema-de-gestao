import { Request, Response } from 'express'
import { Model, PaginateModel, PaginateResult, Types } from 'mongoose'
import { Role } from '../types'

export const findAllRoles =
  (RolesModel: PaginateModel<Role>) => async (req: Request, res: Response) => {
    let requestPage = Number(req.query.page) || 1
    let requestLimit = Number(req.query.limit) || 10
    let requestField = req.query.field || "id"
    let requestCriteria = req.query.criteria || "asc"

    const options = {
      page: requestPage,
      limit: requestLimit,
      sort: { [requestField.toString()] : requestCriteria },
    }
    try {
      const results: PaginateResult<Role> = await RolesModel.paginate({}, options)
      res.send({ success: true, results })
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

export const removeRole = (RolesModel: Model<Role>) => async (req: Request, res: Response) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
  }
  const role: Role | null = await RolesModel.findById(req.params.id)
  if (!role) {
    res.status(404).send({ success: false, errors: 'Role not found' })
  }
  await RolesModel.findByIdAndDelete(req.params.id)
  res.send({ success: true })
}
