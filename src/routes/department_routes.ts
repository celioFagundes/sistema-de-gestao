import  { Router } from 'express'
import {
  findAllDepartments,
  createDepartment,
  updateDepartment,
  removeDepartment,
} from '../controllers/department_controller'

import DepartmentsModel from '../models/department_model'

const router = Router()

router.get('/', findAllDepartments(DepartmentsModel))
router.post('/', createDepartment(DepartmentsModel))
router.put('/:id', updateDepartment(DepartmentsModel))
router.delete('/:id', removeDepartment(DepartmentsModel))

export default router
