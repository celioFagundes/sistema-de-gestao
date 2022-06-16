import { Router } from "express";
import { createRole, findAllRoles, findRoleById, removeRole, updateRole } from "../controllers/role_controller";
import RolesModel from "../models/role_model";

const router  = Router()

router.get('/', findAllRoles(RolesModel))
router.post('/', createRole(RolesModel) )
router.get('/:id', findRoleById(RolesModel))
router.put('/:id', updateRole(RolesModel))
router.delete('/:id', removeRole(RolesModel))

export default router