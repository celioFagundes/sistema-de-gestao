import { Request, Response } from 'express'
import { Model } from 'mongoose'
import { Agent, Department } from '../types'

export const findAllDepartments =
  (DepartmentsModel: Model<Department, {}, {}, {}>) => async (req: Request, res: Response) => {
    try {
      const departments: Department[] = await DepartmentsModel.find({})
      res.send(departments)
    } catch (e) {
      res.send({ success: false, errors: e })
    }
  }

export const createDepartment =
  (DepartmentsModel: Model<Department, {}, {}, {}>) => async (req: Request, res: Response) => {
    try {
      const newDepartment: Department = await DepartmentsModel.create({ ...req.body })
      res.send(newDepartment)
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
      res.send(updateDepartment)
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
      res.send(agentsFromDepartment)
    }
    if(!department){
      res.status(404).send('Departamento não encontrado')
    }
    /*try {
      await DepartmentsModel.findByIdAndDelete(req.params.id)
      res.send({
        success: true,
      })
    } catch (e) {
      res.send({ success: false, errors: e })
    }*/
  }
