import { Request, Response } from 'express'
import { Model, Types } from 'mongoose'
import { Agent, Department } from '../types'

export const findAllDepartments =
  (DepartmentsModel: Model<Department>) => async (req: Request, res: Response) => {
    try {
      const departments: Department[] = await DepartmentsModel.find({})
      res.send({ success: true, departments })
    } catch (e) {
      res.send({ success: false, errors: e })
    }
  }
export const findDepartmentsById =
  (DepartmentsModel: Model<Department>) => async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
    }
    const department: Department | null = await DepartmentsModel.findById(req.params.id)
    if (!department) {
      return res.status(404).send({ success: false, errors: 'Department not found' })
    }
    res.send({ success: true, department })
  }

export const createDepartment =
  (DepartmentsModel: Model<Department>) => async (req: Request, res: Response) => {
    try {
      const newDepartment: Department = await DepartmentsModel.create({ ...req.body })
      res.send({ success: true, department: newDepartment })
    } catch (e) {
      res.send({ success: false, errors: e })
    }
  }
export const updateDepartment =
  (DepartmentsModel: Model<Department>) => async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
    }
    const updateDepartment: Department | null = await DepartmentsModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { runValidators: true }
    )
    if (!updateDepartment) {
      return res.status(404).send({ success: false, errors: 'Department not found' })
    }
    res.send({ success: true, department: updateDepartment })
  }
export const updateDepartmentCount =
  (DepartmentsModel: Model<Department>) => async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
    }
    const department: Department | null = await DepartmentsModel.findById(req.params.id)
    if (!department) {
      return res.status(404).send({ success: false, errors: 'Department not found' })
    }
    if (req.params.operation === 'increment') {
      department.agents_count++
    }

    if (req.params.operation === 'decrement') {
      if (department.agents_count === 0) {
        return res.status(400).send({ success: false, errors: 'Agents count is already 0' })
      }
      department.agents_count--
    }
    await DepartmentsModel.updateOne(
      { _id: department._id },
      { agents_count: department.agents_count }
    )
    res.send({ success: true, agents_count: department.agents_count })
  }
export const removeDepartment =
  (DepartmentsModel: Model<Department>) => async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ success: false, errors: 'Id parameter not valid' })
    }
    const department: Department | null = await DepartmentsModel.findById(req.params.id)
    if (!department) {
      return res.status(404).send({ success: false, errors: 'Department not found' })
    }

    if (department.agents_count > 0) {
      res.status(424).send({
        success: false,
        errors: 'Failed to delete department. There are agents that belongs to this department',
      })
    }
    if (department.agents_count === 0) {
      await DepartmentsModel.findByIdAndDelete(req.params.id)
      res.send({ success: true })
    }
  }
