import  { Router } from 'express'
import {
  findAllDepartments,
  createDepartment,
  updateDepartment,
  removeDepartment,
  findAllDepartmentsPaginated,
} from '../controllers/department_controller'

import DepartmentsModel from '../models/department_model'

const router = Router()

router.get('/', findAllDepartments(DepartmentsModel))
router.get('/paginated', findAllDepartmentsPaginated(DepartmentsModel))
router.post('/', createDepartment(DepartmentsModel))
router.put('/:id', updateDepartment(DepartmentsModel))
router.delete('/:id', removeDepartment(DepartmentsModel))

export default router
