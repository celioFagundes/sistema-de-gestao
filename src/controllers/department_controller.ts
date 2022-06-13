import { Request, Response } from 'express'
import { Model } from 'mongoose'
import { Agent, Department } from '../types'

export const findAllDepartments =
  (DepartmentsModel: Model<Department, {}, {}, {}>) => async (req: Request, res: Response) => {
    try {
      const departments: Department[] = await DepartmentsModel.find({})
      res.send({ success: true, departments })
    } catch (e) {
      res.send({ success: false, errors: e })
    }
  }

export const createDepartment =
  (DepartmentsModel: Model<Department, {}, {}, {}>) => async (req: Request, res: Response) => {
    try {
      const newDepartment: Department = await DepartmentsModel.create({ ...req.body })
      res.send({ success: true, department: newDepartment })
    } catch (e) {
      res.send({ success: false, errors: e })
    }
  }
export const updateDepartment =
  (DepartmentsModel: Model<Department, {}, {}, {}>) => async (req: Request, res: Response) => {
    try {
      const updateDepartment: Department | null = await DepartmentsModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { runValidators: true }
      )
      res.send({ success: true, department: updateDepartment })
    } catch (e) {
      res.send({ success: false, errors: e })
    }
  }
export const removeDepartment =
  (DepartmentsModel: Model<Department, {}, {}, {}>, AgentsModel: Model<Agent, {}, {}, {}>) =>
  async (req: Request, res: Response) => {
    const department: Department | null = await DepartmentsModel.findById(req.params.id)
    if (department) {
      const agentsFromDepartment: Agent[] = await AgentsModel.find({ department: department.name })
      if (agentsFromDepartment.length > 0) {
        res
          .status(424)
          .send({
            success: false,
            errors: 'Failed to delete department. There are agents that belongs to this department',
          })
      }
      if (agentsFromDepartment.length === 0) {
        await DepartmentsModel.findByIdAndDelete(req.params.id)
        res.send({ success: true })
      }
    }
    if (!department) {
      res.status(404).send({ success: false, errors: 'Departament not found' })
    }
  }
