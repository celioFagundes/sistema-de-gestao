import express, { Router } from 'express'
import {
  findAllDepartments,
  createDepartment,
  updateDepartment,
  removeDepartment,
} from '../controllers/department_controller'

import DepartmentsModel from '../models/department_model'
import AgentsModel from '../models/agent_model'

const router: Router = express.Router()

router.get('/', findAllDepartments(DepartmentsModel))
router.post('/', createDepartment(DepartmentsModel))
router.put('/:id', updateDepartment(DepartmentsModel))
router.delete('/:id', removeDepartment(DepartmentsModel, AgentsModel))

export default router
